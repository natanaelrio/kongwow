import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '@/component/listProduct.module.css'

export default function SkletonListProduct() {
    return (
        <>
            {
                [...Array(10).keys()].map((i) => {
                    return (
                        <>
                            <div className={styles.produk}>
                                <div className={styles.gambar}>
                                    <Skeleton style={{ height: '200px' }} />
                                </div>
                                <div className={styles.informasi}>
                                    <div className={styles.judul}></div>
                                    <div className={styles.harga}>
                                        <div className={styles.hargadiskon}></div>
                                        <div className={styles.hargaasli}></div>
                                    </div>
                                    <button>
                                        <div className={styles.logo}>
                                        </div>
                                        {/* <span>Keranjang+</span> */}
                                    </button>
                                    <Skeleton style={{ height: '20px' }} />
                                </div>

                            </div>
                        </>
                    );
                })
            }
        </>
    )
}
