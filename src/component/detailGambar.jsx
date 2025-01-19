'use client'
import Image from "next/image"
import styles from '@/component/detailGambar.module.css'
import { useBearStore } from '@/zustand/zustand';

export default function DetailGambar({ dataDetailGambar }) {
    const setDetailGambar = useBearStore((state) => state.setDetailGambar);
    return (
        <div className={styles.detailgambar}
            onClick={() => setDetailGambar(true)}
        >
            <div className={styles.dalamgambar}>

                <Image
                    src={`${process.env.NEXT_PUBLIC_URL + dataDetailGambar.image_url}`}
                    alt={dataDetailGambar.title}
                    width={500}
                    height={500}
                />
                <div className={styles.close}>X</div>
            </div>
        </div>
    )
}
