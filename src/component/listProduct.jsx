'use client';
import { useEffect, useState } from 'react';
import styles from '@/component/listProduct.module.css';
import { formatRupiah } from '@/utils/formatRupiah';
import Image from 'next/image';
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowForward } from "react-icons/io";
import useWindowDimensions from '@/utils/getWindowDimensions';
import { useBearStore } from '@/zustand/zustand';

export default function ListProduct({ data }) {
    const { width } = useWindowDimensions();
    const [cart, setCart] = useState([]);
    const [detail, setDetail] = useState(true);

    const setButonWhatsapp = useBearStore((state) => state.setButonWhatsapp);

    useEffect(() => {
        setButonWhatsapp(cart.length > 0);
    }, [cart, setButonWhatsapp]);

    const kondisiWidth = width <= 767;

    const handleAddToCart = (product) => {
        setCart((prev) => {
            const existingProduct = prev.find((item) => item.id === product.id);
            if (existingProduct) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, count: item.count + 1, total: (item.count + 1) * item.price }
                        : item
                );
            } else {
                return [...prev, { ...product, count: 1, total: product.price }];
            }
        });
    };

    const handleRemoveFromCart = (productId) => {
        setCart((prev) => {
            const existingProduct = prev.find((item) => item.id === productId);
            if (existingProduct && existingProduct.count > 1) {
                return prev.map((item) =>
                    item.id === productId
                        ? { ...item, count: item.count - 1, total: (item.count - 1) * item.price }
                        : item
                );
            } else {
                return prev.filter((item) => item.id !== productId);
            }
        });
    };

    const getCartSummary = () => {
        const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
        const grandTotal = cart.reduce((acc, item) => acc + item.total, 0);

        return {
            items: cart.map((item) => ({
                title: item.title,
                price: item.price,
                total: item.total,
                count: item.count,
            })),
            totalCount,
            grandTotal,
        };
    };

    const handlePesanSekarang = () => {
        const { items, grandTotal } = getCartSummary();
        const waNumber = process.env.NEXT_PUBLIC_WA; // Ganti dengan nomor WhatsApp tujuan
        const itemList = items.map((item) =>
            `- ${item.title} (${item.count} x ${formatRupiah(item.price)}) = ${formatRupiah(item.total)}`
        ).join('%0A');
        const message = `Halo Kong Wow, saya ingin memesan:%0A${itemList}%0ATotal Keseluruhan: ${formatRupiah(grandTotal)}`;
        const waLink = `https://wa.me/${waNumber}?text=${message}`;
        window.open(waLink, '_blank');
    };

    const { items, totalCount, grandTotal } = getCartSummary();
    return (
        <>
            <div className={styles.countainerluar}>
                <div className={styles.countainer}>
                    <div className={styles.listproduk}>
                        <div className={styles.gridlist}>
                            {data.map((product) => {
                                const cartItem = cart.find((item) => item.id === product.id);
                                const productCount = cartItem?.count || 0;
                                const productTotal = cartItem?.total || 0;

                                return (
                                    <div key={product.id} className={`${styles.produk} ${cartItem ? styles.inCart : ''}`}>
                                        <div className={styles.gambar}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_URL + product.image_url}`}
                                                alt={product.title}
                                                width={500}
                                                height={500}
                                            />
                                        </div>
                                        <div className={styles.informasi}>
                                            <div className={styles.judul}>{product.title}</div>
                                            <div className={styles.harga}>
                                                <div className={styles.hargadiskon}>{formatRupiah(product.price)}</div>
                                                <div className={styles.hargaasli}>{formatRupiah(product.original_price)}</div>
                                            </div>
                                            {!cartItem ? (
                                                <button onClick={() => handleAddToCart(product)}>
                                                    <div className={styles.logo}>
                                                        <BsCartPlus />
                                                    </div>
                                                    <span>Keranjang+</span>
                                                </button>
                                            ) : (
                                                <div className={styles.cartActions}>
                                                    <button onClick={() => handleRemoveFromCart(product.id)}>
                                                        {productCount === 1 ? <FaRegTrashAlt /> : <AiOutlineMinus />}
                                                    </button>
                                                    <span>{productCount}</span>
                                                    <button onClick={() => handleAddToCart(product)}>
                                                        <AiOutlinePlus />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.angka}>
                                            <div className={styles.satu}>{product.discount_percent} %</div>
                                            {cartItem && (
                                                <div className={styles.total}>
                                                    Total: {formatRupiah(productTotal)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.cartSummary} style={items.length > 0 ? { display: 'block' } : { display: 'none' }}>
                <div className={styles.rekapan}
                    onClick={() => setDetail(!detail)}
                    style={detail ? { display: 'none' } : { display: 'block' }}>
                    <h2>Rekapan Keranjang</h2>
                    {items.length > 0 ? (
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    {item.title} - {item.count} x {formatRupiah(item.price)} = {formatRupiah(item.total)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Keranjang kosong.</p>
                    )}
                    <h3>Total Item: {totalCount}</h3>
                    <h3>Total Keseluruhan: {formatRupiah(grandTotal)}</h3>
                    <div className={styles.arrowbawah} onClick={() => setDetail(!detail)}>
                        <IoIosArrowDown />
                    </div>
                </div>
                <div className={styles.pesan}>
                    <div className={styles.detail}
                        onClick={() => setDetail(!detail)}
                        style={!kondisiWidth && !detail ? { display: 'none' } : { display: 'flex' }}
                    >
                        <span>
                            Lihat Detail ({items.length})
                            <IoIosArrowUp />
                        </span>
                    </div>
                    <div className={styles.tombolpesansekarang}
                        style={!kondisiWidth && !detail ? { marginTop: '2px' } : { margin: 0 }}
                        onClick={handlePesanSekarang}
                    >
                        <span>
                            Pesan Sekarang <IoIosArrowForward />
                        </span>
                    </div>
                </div>
            </div >
            {!detail && <div className={styles.bgblack}
                onClick={() => setDetail(!detail)}
            ></div>}
        </>
    );
}
