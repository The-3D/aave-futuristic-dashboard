import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';

import { HttpLink } from 'apollo-link-http';

const WS_SERVER_URL = "wss://api.thegraph.com/subgraphs/name/aave/protocol"
const QUERY_SERVER_URL = "https://api.thegraph.com/subgraphs/name/aave/protocol"

export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
    // Create a WebSocket link:
    const wsLink = new WebSocketLink({
        uri:  WS_SERVER_URL,
        options: {
        reconnect: true,
        timeout: 3000,
        lazy: true,
    },
  });
// @ts-ignore
wsLink.subscriptionClient.maxConnectTimeGenerator.setMin(5000);

const queryLink = new HttpLink({ uri: QUERY_SERVER_URL });

const dataLink = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    queryLink
);

// using the ability to split links, you can send data to each link
const hybridLink = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'mutation';
    },
    dataLink
);

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            // TODO: should be customized
            console.log('graphQLErrors', graphQLErrors);
            if (networkError) console.log(`[Network error]: ${ networkError }`);
        }),
        hybridLink,
    ]),
    resolvers: {
        Queries: {
            isDisconnected: (rootValue, args, context, info) => false,
        },
    },
});
wsLink['subscriptionClient'].onDisconnected(() => {
    client.writeData({ data: { isDisconnected: true } });
});

wsLink['subscriptionClient'].onReconnected(async () => {
    console.log('reconnected');
    client.writeData({ data: { isDisconnected: false } });
    await client.resetStore();
    console.log('data refetched');
});
return client;
}