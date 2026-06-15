"use client"
import dynamic from "next/dynamic"
const MaterielChart = dynamic(() => import("./MaterielChart"), { ssr: false })
export default MaterielChart
