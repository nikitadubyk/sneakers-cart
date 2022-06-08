import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectCard } from '../../redux/productCard/selector'
import {
    changeActiveColor,
    changeActiveTab,
    plusItem,
    minusItem,
} from '../../redux/productCard/slice'

import { addItem, buyNow } from '../../redux/cart/slice'

import Slider from '../Slider'
import Modal from '../Modal'

import './Card.scss'

interface CardProps {
    title: string
    price: number
    productImages: string[]
    productColors: string[]
}

const Card: React.FC<CardProps> = ({
    productImages,
    productColors,
    title,
    price,
}) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [textModal, setTextModal] = useState<string>('')

    const { activeColor, activeTab, count } = useSelector(selectCard)
    const dispatch = useDispatch()

    const changeColor = (num: number) => dispatch(changeActiveColor(num))
    const changeTab = (tab: string) => dispatch(changeActiveTab(tab))

    const tabStyle = (value: string) => {
        return `card__tabs__list-item ${
            activeTab === value && 'card__tabs__list-item_active'
        }`
    }

    const showedModal = (text: string) => {
        setShowModal(true)
        setTextModal(text)

        setTimeout(() => {
            setShowModal(false)
            setTextModal('')
        }, 3000)
    }

    const createProductObj = () => {
        return {
            title,
            price,
            count,
            color: activeColor,
        }
    }

    const addToCart = () => {
        const product = createProductObj()
        dispatch(addItem(product))
        showedModal('Товар успешно добавлен в корзину!')
    }

    const buyInOneClick = () => {
        const product = createProductObj()
        dispatch(buyNow(product))
        showedModal('Спасибо за покупку!')
    }

    return (
        <>
            <Modal text={textModal} show={showModal} />
            <div className='card'>
                <div className='card__header'>
                    <h2 className='card__header__title'>{title}</h2>
                    <svg
                        width='52'
                        height='18'
                        viewBox='0 0 52 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='card__header__logo'
                    >
                        <path
                            d='M6.49104 17.9194C4.97551 17.8599 3.73557 17.4498 2.76605 16.6881C2.58102 16.5426 2.14011 16.1063 1.99219 15.9223C1.59903 15.4334 1.33174 14.9576 1.15345 14.4297C0.60485 12.8047 0.887196 10.6724 1.96105 8.33211C2.88049 6.32858 4.29923 4.34147 6.77443 1.58934C7.13904 1.18437 8.22483 0 8.23184 0C8.23443 0 8.17526 0.101372 8.10078 0.224813C7.4572 1.29087 6.90652 2.54657 6.60653 3.63367C6.12462 5.37801 6.18275 6.87495 6.77676 8.0357C7.18653 8.83537 7.88902 9.52803 8.67897 9.91092C10.0619 10.581 12.0866 10.6364 14.5592 10.0731C14.7294 10.0341 23.1651 7.81962 33.3051 5.15192C43.4452 2.48396 51.743 0.30283 51.7443 0.304627C51.7472 0.306936 28.186 10.2771 15.9551 15.4496C14.0181 16.2685 13.5001 16.4753 12.5895 16.7915C10.2617 17.5999 8.17656 17.9856 6.49104 17.9194Z'
                            fill='#131212'
                        />
                    </svg>
                </div>
                <div className='card__wrapper'>
                    <div className='card__slider'>
                        <p>Артикул: 34934934</p>
                        <Slider productImages={productImages} />
                    </div>
                    <div className='card__info'>
                        <div className='card__price'>
                            <span>{price}</span> ₽
                        </div>

                        <div className='card__variants'>
                            <p>Цвет:</p>
                            {productColors &&
                                productColors.map((color, i) => (
                                    <div
                                        className={`card__variants__color ${
                                            activeColor === i &&
                                            'card__variants__color_active'
                                        }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => changeColor(i)}
                                        key={i}
                                    ></div>
                                ))}
                        </div>

                        <div className='card__order'>
                            <div className='card__order__counter'>
                                <span onClick={() => dispatch(minusItem())}>
                                    -
                                </span>
                                <span>{count}</span>
                                <span onClick={() => dispatch(plusItem())}>
                                    +
                                </span>
                            </div>

                            <div
                                className='card__order__buy'
                                onClick={buyInOneClick}
                            >
                                Купить в 1 клик
                            </div>
                            <div
                                className='card__order__cart'
                                onClick={addToCart}
                            >
                                <span>
                                    <svg
                                        width='17'
                                        height='13'
                                        viewBox='0 0 17 15'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M3.30933 2.68333L3.07332 1.26667H2.22615C2.09978 0.779334 1.66005 0.416667 1.13333 0.416667C0.5083 0.416667 0 0.924967 0 1.55C0 2.17503 0.5083 2.68333 1.13333 2.68333C1.66005 2.68333 2.09978 2.32067 2.22643 1.83333H2.59307L2.73473 2.68333H2.72397L4.18908 10.0545C3.49067 10.1078 2.90898 10.6456 2.84042 11.3222C2.80018 11.7203 2.93108 12.1189 3.19968 12.4153C3.46857 12.7125 3.85163 12.8833 4.25 12.8833H4.81667C4.81667 13.8209 5.57912 14.5833 6.51667 14.5833C7.45422 14.5833 8.21667 13.8209 8.21667 12.8833H11.3333C11.3333 13.8209 12.0958 14.5833 13.0333 14.5833C13.9709 14.5833 14.7333 13.8209 14.7333 12.8833H15.8667C16.0233 12.8833 16.15 12.7567 16.15 12.6C16.15 12.4433 16.0233 12.3167 15.8667 12.3167H14.6342C14.4001 11.6574 13.772 11.1833 13.0333 11.1833C12.2947 11.1833 11.6665 11.6574 11.4325 12.3167H8.1175C7.88347 11.6574 7.25532 11.1833 6.51667 11.1833C5.77802 11.1833 5.14987 11.6574 4.91583 12.3167H4.25C4.01143 12.3167 3.78193 12.2141 3.61987 12.0353C3.45638 11.8543 3.3796 11.6214 3.40425 11.3791C3.44732 10.9516 3.84228 10.617 4.30327 10.617H4.52738C4.53135 10.617 4.53447 10.617 4.53843 10.617H15.5867C16.3662 10.6167 17 9.98285 17 9.20368V2.68333H3.30933ZM1.13333 2.11667C0.820817 2.11667 0.566667 1.86252 0.566667 1.55C0.566667 1.23748 0.820817 0.983334 1.13333 0.983334C1.44585 0.983334 1.7 1.23748 1.7 1.55C1.7 1.86252 1.44585 2.11667 1.13333 2.11667ZM13.0333 11.75C13.6584 11.75 14.1667 12.2583 14.1667 12.8833C14.1667 13.5084 13.6584 14.0167 13.0333 14.0167C12.4083 14.0167 11.9 13.5084 11.9 12.8833C11.9 12.2583 12.4083 11.75 13.0333 11.75ZM6.51667 11.75C7.1417 11.75 7.65 12.2583 7.65 12.8833C7.65 13.5084 7.1417 14.0167 6.51667 14.0167C5.89163 14.0167 5.38333 13.5084 5.38333 12.8833C5.38333 12.2583 5.89163 11.75 6.51667 11.75ZM16.4333 9.20368C16.4333 9.67033 16.0537 10.05 15.587 10.05H4.76595L3.41445 3.25H16.4333V9.20368Z'
                                            fill='black'
                                        />
                                    </svg>
                                </span>{' '}
                                В корзину
                            </div>
                        </div>

                        <div className='card__tabs'>
                            <ul
                                className='card__tabs__list'
                                onClick={(e: any) =>
                                    changeTab(e.target.innerText)
                                }
                            >
                                <li className={tabStyle('Описание')}>
                                    Описание
                                </li>
                                <li className={tabStyle('Характеристики')}>
                                    Характеристики
                                </li>
                                <li className={tabStyle('Отзывы')}>Отзывы</li>
                            </ul>

                            {activeTab === 'Характеристики' && (
                                <div className='card__tabs__char'>
                                    <div className='card__tabs__char-item'>
                                        <p>Категория:</p>
                                        <p>Кроссовки</p>
                                    </div>
                                    <div className='card__tabs__char-item'>
                                        <p>Производитель</p>
                                        <p>Nike</p>
                                    </div>
                                    <div className='card__tabs__char-item'>
                                        <p>Гарантия</p>
                                        <p>2 года</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Описание' && (
                                <div className='card__tabs__descr'>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Nisi ducimus
                                        recusandae, quae rem accusantium quod
                                        quaerat eos repellat veritatis odit sunt
                                        quas illum aperiam autem eveniet soluta,
                                        quidem molestias sed!
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Nisi ducimus
                                        recusandae, quae rem accusantium quod
                                        quaerat eos repellat veritatis odit sunt
                                        quas illum aperiam autem eveniet soluta,
                                        quidem molestias sed!
                                    </p>
                                </div>
                            )}

                            {activeTab === 'Отзывы' && (
                                <div className='card__tabs__descr'>
                                    <p>Все круто, классный товар</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
