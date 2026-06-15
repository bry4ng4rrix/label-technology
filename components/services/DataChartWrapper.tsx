"use client"
import dynamic from "next/dynamic"
const DataChart = dynamic(() => import("./DataChart"), { ssr: false })
export default DataChart
