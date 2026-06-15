"use client"
import dynamic from "next/dynamic"
const PerformanceChart = dynamic(() => import("./PerformanceChart"), { ssr: false })
export default PerformanceChart
