import React, { useEffect, Children } from 'react'


type ListBlockProps = {
    title: string,
    children?: any
}

const ListBlock = ({title, children}: ListBlockProps) => {


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
               {children}
            </div>
        </div>

    )

}

export default ListBlock