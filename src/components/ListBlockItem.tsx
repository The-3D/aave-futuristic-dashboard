
import React from 'react'


type ListBlockItemProps = {
    item: ListBlockElement,
    index: number
}
export interface ListBlockElement {
    date: string
    content: any
    logo: string
}

const ListBlockItem = ({item, index} : ListBlockItemProps) => {

    return (<div className="row items-push overflow-hidden animated fadeInLeft" data-toggle="appear" data-timeout={index*100}>
    <div
        className="col-xs-4"
    >
        {item.date}
    </div>
    <div className="col-xs-4">
        <div className="text-uppercase font-w600 text-white-op">
            {item.content}
          </div>
    </div>
    <div className="col-xs-4">
        <div className="text-uppercase font-w600 text-white-op">
            <img src={item.logo} width={12}/>
          </div>
    </div>
 
 </div>)
 
}

export default ListBlockItem
