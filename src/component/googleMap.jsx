'use client'
import styles from '@/component/googleMap.module.css'
import { FaWhatsapp } from "react-icons/fa";

export default function GoogleMap() {
    return (
        <div className={styles.container}>
            <div className={styles.dalamcontainer}>
                <div className={styles.text}>
                    <h1>KONG WOW</h1>
                    <div className={styles.isi}>
                        <b>
                            Kong :
                        </b>
                        <span>
                            Bisa jadi istilah informal atau slang yang berarti &quot;hebat&quot; atau &quot;besar.&quot;
                        </span>
                    </div>
                    <div className={styles.isi}>
                        <b>Wow:</b>
                        <span>
                            kejutan, inovasi, dan daya tarik unik sehingga orang langsung berkata &quot;Wow!&quot;
                        </span>
                    </div>
                    <div className={styles.pesanwhatsapp}
                        onClick={() => OpenWhatsApp()}
                    >
                        <button>
                            <div className={styles.ikonwa}>
                                <FaWhatsapp size={30} />
                            </div>
                            <span>
                                Whatsapp Sekarang
                            </span>
                        </button>
                    </div>
                </div>

                <div className={styles.googlemap}>
                    <iframe className={styles.dalamgooglemap} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7468.877208383998!2d110.48159965481007!3d-7.4097903519187645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a7b11ab668a95%3A0xe5cea7fd5efd33b4!2sKong%20Wow%20%7C%20Camilan%20Singkong%20Istimewa!5e0!3m2!1sen!2sid!4v1737174767395!5m2!1sen!2sid" loading="lazy"></iframe>
                </div>
            </div>
        </div >
    )
}
