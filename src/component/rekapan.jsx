'use client'
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { IoIosArrowDown } from "react-icons/io";
import styles from '@/component/listProduct.module.css';
import { formatRupiah } from '@/utils/formatRupiah';
import { useBearStore } from '@/zustand/zustand';
import { ConvertToDecimal } from "@/utils/convertToDecimal";

export default function Rekapan({ items, grandTotal, totalCount }) {
    useLockBodyScroll();
    const setDetailList = useBearStore((state) => state.setDetailList);
    const detailList = useBearStore((state) => state.detailList);

    // Hitung total berat (kg)
    const totalKg = items.reduce((acc, item) => {
        // asumsikan item.weight dalam gram, maka bagi 1000 agar jadi kg
        const weightKg = ConvertToDecimal(item.weight) * item.count;
        return acc + weightKg;
    }, 0);

    return (
        <div
            className={styles.rekapan}
            onClick={() => setDetailList(!detailList)}
            style={detailList ? { display: 'none' } : { display: 'block' }}
        >
            <h2>Rekapan Keranjang</h2>
            {items.length > 0 ? (
                <ul>
                    {items?.map((item, index) => (
                        <li key={index}>
                            {item.title} ({ConvertToDecimal(item.weight)}kg) - {item.count} x {formatRupiah(item.price)} = {formatRupiah(item.total)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Keranjang kosong.</p>
            )}
            <h3>Total Item: {totalCount}</h3>
            <h3>Total Berat: {totalKg} kg</h3>
            <h3>Total Keseluruhan: {formatRupiah(grandTotal)}</h3>
            <div className={styles.arrowbawah} onClick={() => setDetailList(!detailList)}>
                <IoIosArrowDown />
            </div>
        </div>
    );
}
