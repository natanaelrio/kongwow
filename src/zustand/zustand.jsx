import { create } from 'zustand'

export const useBearStore = create((set) => ({
    buttonWhatsApp: false,
    setButonWhatsapp: (e) => set((state) => ({ buttonWhatsApp: e ? e : !state.buttonWhatsApp }))
}))