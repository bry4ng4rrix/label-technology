"use client"
import dynamic from "next/dynamic"
const GrowthChart = dynamic(() => import("./GrowthChart"), { ssr: false })
export default GrowthChart
