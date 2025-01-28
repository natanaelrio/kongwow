'use client'
import { sendGTMEvent } from '@next/third-parties/google'

export const OpenWhatsApp = () => {
    sendGTMEvent({ event: 'buttonClicked' })
    // const encodedMessage = encodeURIComponent(`Halo, saya tertarik dengan produk camilan Singkong Kongwow. Bisa minta daftar produknya?`);
    // const whatsappNumber = process.env.NEXT_PUBLIC_WA; // Ganti dengan nomor WhatsApp Anda (dalam format internasional, tanpa "+" atau "00")
    // const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    // window.open(whatsappLink, '_blank');
};