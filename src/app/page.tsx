'use client'
import InfoBar from "@/common/components/infobar";
import Navbar from "@/common/components/navbar";
import '@/styles/globals.css';
import { Suspense } from "react";
export default function Front() {

    return (
        <div className="bg-slate-200 min-h-screen">
            <InfoBar/>
            <Suspense fallback={<div>Ładowanie danych...</div>}>
            <Navbar/>
            </Suspense>
        </div>
    )
}  