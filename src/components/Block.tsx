import React, { useEffect, Children } from 'react'


type BlockProps = {
    title: string,
    children?: any
}

const Block = ({title, children}: BlockProps) => {


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

export default Block