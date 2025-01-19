'use client';
import { useEffect, useState, useRef } from 'react';
import styles from '@/component/listProduct.module.css';
import { formatRupiah } from '@/utils/formatRupiah';
import Image from 'next/image';
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowForward } from "react-icons/io";
import useWindowDimensions from '@/utils/getWindowDimensions';
import { useBearStore } from '@/zustand/zustand';
import { ConvertToDecimal } from '@/utils/convertToDecimal';
import Rekapan from '@/component/rekapan';
import { HandleListProduct } from '@/service/product';
import { BsFilterSquare } from "react-icons/bs";
import SkletonListProduct from './skleton/listProduct';
import DetailGambar from '@/component/detailGambar';

export default function ListProduct() {
    const [data, setData] = useState([])
    const [dataDetailGambar, setDataDetailGambar] = useState([])
    const { width } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(true)
    const [cart, setCart] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState('')
    const [isFilterBox, setIsFilterBox] = useState(false); // State untuk menambahkan background merah
    const filterRef = useRef(null); // Gunakan useRef untuk elemen filter

    const setDetailGambar = useBearStore((state) => state.setDetailGambar);
    const detailGambar = useBearStore((state) => state.detailGambar);

    const setButonWhatsapp = useBearStore((state) => state.setButonWhatsapp);
    const setDetailList = useBearStore((state) => state.setDetailList);
    const detailList = useBearStore((state) => state.detailList);
    const kondisiWidth = width <= 767;

    useEffect(() => {
        const FetchData = async () => {
            setIsLoading(true)
            const res = await HandleListProduct()
            const dataReal = res.filter((product) => product.weight === filteredProducts);
            setData(filteredProducts == '' ? res : dataReal)
            setIsLoading(false)
        }
        FetchData()
    }, [filteredProducts])

    useEffect(() => {
        setButonWhatsapp(cart.length > 0);
    }, [cart, setButonWhatsapp]);

    // Event listener untuk menangani scroll
    useEffect(() => {
        const handleScroll = () => {
            if (filterRef.current) {
                const filterTop = filterRef.current.getBoundingClientRect().top;
                const isVisible = filterTop <= 0; // Elemen `filter` mencapai bagian atas layar
                setIsFilterBox(isVisible);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


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
        const grandTotalWeight = cart.reduce((acc, item) => acc + item.weight * item.count, 0);

        return {
            items: cart.map((item) => ({
                title: item.title,
                price: item.price,
                total: item.total,
                count: item.count,
                weight: item.weight,
            })),
            totalCount,
            grandTotal,
            grandTotalWeight
        };
    };
    const { items, totalCount, grandTotal, grandTotalWeight } = getCartSummary();

    const handlePesanSekarang = () => {
        const { items, grandTotal } = getCartSummary();
        const waNumber = process.env.NEXT_PUBLIC_WA; // Ganti dengan nomor WhatsApp tujuan
        const itemList = items.map((item) =>
            `- ${item.title} (${ConvertToDecimal(item.weight)}kg) (${item.count} x ${formatRupiah(item.price)}) = ${formatRupiah(item.total)}`
        ).join('%0A');
        const message = `Halo Kong Wow, saya ingin memesan:%0A${itemList}%0ATotal Berat:${ConvertToDecimal(grandTotalWeight)}kg%0ATotal Keseluruhan: ${formatRupiah(grandTotal)} `;
        const waLink = `https://wa.me/${waNumber}?text=${message}`;
        window.open(waLink, '_blank');
    };

    const handleDetailGambar = (product) => {
        setDataDetailGambar(product)
        setDetailGambar(false)
    }


    return (
        <>
            <div className={styles.countainerluar}>
                <div className={styles.countainer}>

                    <div className={styles.kemasan}>
                        Kemasan
                    </div>

                    <div
                        ref={filterRef}
                        className={`${styles.filter} ${isFilterBox ? styles.filterbox : ''}`}
                    >
                        <div className={styles.dalamfilter}>
                            <div className={styles.ikonfilter}>
                                <BsFilterSquare />
                            </div>
                            <button className={`${filteredProducts == '' ? styles.onfilter : styles.offfilter}`} onClick={() => setFilteredProducts('')}>Semua</button>
                            <button className={`${filteredProducts == 250 ? styles.onfilter : styles.offfilter}`} onClick={() => setFilteredProducts(250)}>¼kg</button>
                            <button className={`${filteredProducts == 500 ? styles.onfilter : styles.offfilter}`} onClick={() => setFilteredProducts(500)}>½Kg</button>
                            <button className={`${filteredProducts == 1000 ? styles.onfilter : styles.offfilter}`} onClick={() => setFilteredProducts(1000)}>Campur</button>
                        </div>
                    </div>

                    <div className={styles.listproduk}>
                        <div className={styles.gridlist}>

                            {isLoading ? <SkletonListProduct /> :
                                data?.map((product) => {
                                    const cartItem = cart.find((item) => item.id === product.id);
                                    const productCount = cartItem?.count || 0;

                                    return (
                                        <div key={product.id} className={`${styles.produk} ${cartItem ? styles.inCart : ''}`}>
                                            <div className={styles.gambar}
                                                onClick={() => handleDetailGambar(product)}
                                            >
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
                                                        <span>Tambahkan+</span>
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
                                            </div>
                                            <div className={styles.weight}>
                                                {ConvertToDecimal(product.weight) + 'kg'}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.cartSummary} style={items.length > 0 ? { display: 'block' } : { display: 'none' }}>

                {!detailList && <Rekapan
                    items={items}
                    grandTotal={grandTotal}
                    totalCount={totalCount}
                />}

                <div className={styles.pesan}>
                    <div className={styles.detail}
                        onClick={() => setDetailList(!detailList)}
                        style={!kondisiWidth && !detailList ? { display: 'none' } : { display: 'flex' }}
                    >
                        <span>
                            Lihat Detail ({items.length})
                            <IoIosArrowUp />
                        </span>
                    </div>
                    <div className={styles.tombolpesansekarang}
                        style={!kondisiWidth && !detailList ? { marginTop: '2px' } : { margin: 0 }}
                        onClick={handlePesanSekarang}
                    >
                        <span>
                            Pesan Sekarang <IoIosArrowForward />
                        </span>
                    </div>
                </div>
            </div >
            {!detailList && <div className={styles.bgblack}
                onClick={() => setDetailList(!detailList)}
            ></div>}

            {!detailGambar && <div className={styles.bgblack} onClick={() => setDetailGambar(true)}></div>}

            {!detailGambar && <DetailGambar dataDetailGambar={dataDetailGambar} />}

        </>
    );
}
