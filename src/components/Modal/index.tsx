import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import './Modal.scss'

interface ModalProps {
    text: string
    show: boolean
}

const Modal: React.FC<ModalProps> = ({ text, show }) => {
    return (
        <AnimatePresence exitBeforeEnter>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='modal'
                >
                    <h3>Успешно!</h3>
                    <p>{text}</p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal
