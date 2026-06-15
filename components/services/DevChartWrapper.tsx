"use client"
import dynamic from "next/dynamic"
const DevChart = dynamic(() => import("./DevChart"), { ssr: false })
export default DevChart
