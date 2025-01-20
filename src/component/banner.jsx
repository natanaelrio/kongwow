'use client'
import styles from '@/component/banner.module.css'
import useScrollVisibility from '@/utils/scrool';
import Image from 'next/image'
import { FaWhatsapp } from "react-icons/fa";
import { useBearStore } from '@/zustand/zustand';
import { OpenWhatsApp } from '@/utils/tombolWhatsapp';

export default function Banner() {
    const isVisible = useScrollVisibility()
    const buttonWhatsApp = useBearStore((state) => state.buttonWhatsApp)


    return (
        <>
            <div className={styles.container}>
                <div className={styles.gambar}>
                    <Image src={`${process.env.NEXT_PUBLIC_URL}/banner.webp`}
                        alt='banner'
                        width={6000}
                        height={2222} />

                    <div className={styles.overlay}>
                        <div className={styles.text}>
                            <h1>Camilan Singkong Istimewa</h1>
                            <p>Camilan singkong premium, menawarkan rasa autentik, renyah, lezat, dan sehat.</p>
                            <button
                                onClick={() => OpenWhatsApp()}
                            // style={{ display: isVisible ? "flex" : "none" }}
                            >
                                <FaWhatsapp className={styles.logo} size={30} />
                                <span>
                                    Whatsapp Sekarang
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.containermobile}>
                <div className={styles.gambar}>
                    <Image src={`${process.env.NEXT_PUBLIC_URL}/bannermobile.webp`}
                        alt='bannermobile'
                        width={1080}
                        height={1080} />

                    <div className={styles.overlay}>
                        <div className={styles.text}>
                            <h1>Camilan Singkong Istimewa</h1>
                            <p>Camilan singkong premium, menawarkan rasa autentik, renyah, lezat, dan sehat.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{ display: isVisible ? "none" : "flex", bottom: buttonWhatsApp ? 90 : 30, right: buttonWhatsApp ? 40 : 30 }}
                onClick={() => OpenWhatsApp()}
                className={styles.tombolwhatsapp}>
                <button>
                    <FaWhatsapp size={30} />
                    {/* <span>
                        Whatsapp
                    </span> */}
                </button>
            </div>
        </>
    )
}
