import React, { useEffect } from 'react'
import $ from 'jquery'

export interface ListBlockElement {
    date: string
    content: string
    logo: string
}

type ListBlockProps = {
    title: string,
    data: ListBlockElement[]
}
const ListBlock = ({title,data}: ListBlockProps) => {


    return (
        <div className="block">
            <div className="block-header overflow-hidden">
                <h2
                    className="block-title visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInDown"
                >
                    {title}
                </h2>
            </div>
            <div className="block-content">
                {
                    data.map((item, index) => {

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
                                    <img src={require(`../template/assets/img/${item.logo}.svg`)} width={12}/>
                                  </div>
                            </div>
 
                        </div>)


                    })
                }
            </div>
        </div>

    )

}

export default ListBlock