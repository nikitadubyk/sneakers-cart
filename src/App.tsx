import React from 'react'

import Card from './components/Card'

const PRODUCT_IMAGES = [
    './image/image-1.png',
    './image/image-2.png',
    './image/image-3.png',
    './image/image-4.png',
]

const PRODUCT_COLORS = ['#39393a', '#B9B3B0', '#5D70CE', '#FF9200']

const App: React.FC = () => {
    return (
        <div className='app'>
            <Card
                title='Nike Air Force Travis Scott'
                price={12000}
                productImages={PRODUCT_IMAGES}
                productColors={PRODUCT_COLORS}
            />
        </div>
    )
}

export default App
