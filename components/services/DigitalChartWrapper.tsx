"use client"
import dynamic from "next/dynamic"
const DigitalChart = dynamic(() => import("./DigitalChart"), { ssr: false })
export default DigitalChart
