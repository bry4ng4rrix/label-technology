"use client"
import dynamic from "next/dynamic"
const MarketingChart = dynamic(() => import("./MarketingChart"), { ssr: false })
export default MarketingChart
