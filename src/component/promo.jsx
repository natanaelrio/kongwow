'use client'
import { CiDiscount1 } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";
import styles from '@/component/promo.module.css'

export default function Promo() {
    return (
        <div className={styles.container}>
            <div className={styles.promo}>
                <div className={styles.des}>
                    <div className={styles.dalamdes}>
                        <div className={styles.icon}>
                            <IoPricetagOutline />
                        </div>
                        <div className={styles.textpromo}>
                            <h1>Terjual </h1>
                            <p>10rb+</p>
                        </div>
                    </div>
                </div>
                <div className={styles.des}>
                    <div className={styles.dalamdes}>
                        <div className={styles.icon}>
                            <CiDeliveryTruck />
                        </div>
                        <div className={styles.textpromo}>
                            <h1> Pemasanan</h1>
                            <p>COD / Langsung</p>
                        </div>
                    </div>
                </div>
                <div className={styles.des}>
                    <div className={styles.dalamdes}>
                        <div className={styles.icon}>
                            <CiDiscount1 />
                        </div>
                        <div className={styles.textpromo}>
                            <h1>Promo </h1>
                            <p>Diskon trus</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
