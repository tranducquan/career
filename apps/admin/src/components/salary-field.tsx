"use client";

import { useState } from "react";
import { input } from "./styles";

const TYPES = [
	{ value: "Hourly rate", unit: "hour", max: 200, step: 1 },
	{ value: "Daily rate", unit: "day", max: 2000, step: 10 },
	{ value: "Monthly salary", unit: "month", max: 50000, step: 100 },
	{ value: "Yearly salary", unit: "year", max: 500000, step: 1000 },
];

const money = (n: number) => n.toLocaleString("en-US");
const short = (n: number) => (n >= 1000 && n % 1000 === 0 ? `${n / 1000}k` : money(n));

type Props = { defaultType?: string; defaultMin?: number | null; defaultMax?: number | null };

const SalaryField = ({ defaultType = "", defaultMin = null, defaultMax = null }: Props) => {
	const [type, setType] = useState(defaultType);
	const [min, setMin] = useState<number | null>(defaultMin);
	const [max, setMax] = useState<number | null>(defaultMax);

	const cfg = TYPES.find((t) => t.value === type);
	const sliderMax = cfg?.max ?? 500000;
	const step = cfg?.step ?? 1;
	const lo = Math.min(min ?? 0, sliderMax);
	const hi = Math.min(max ?? sliderMax, sliderMax);

	const has = min !== null || max !== null;
	const a = min ?? max ?? 0;
	const b = max ?? min ?? 0;
	const range = has ? (a === b ? `$${money(a)}` : `$${money(a)} - $${money(b)}`) : "";
	const brief = has ? `${a === b ? `$${short(a)}` : `$${short(a)}-${short(b)}`}${cfg ? `/${cfg.unit}` : ""}` : "";

	const num = (v: string) => (v === "" ? null : Math.max(0, Number(v)));
	const pct = (v: number) => `${(v / sliderMax) * 100}%`;

	return (
		<div className="space-y-3">
			<select name="salaryType" value={type} onChange={(e) => setType(e.target.value)} aria-label="Salary type" className={input}>
				<option value="">None</option>
				{TYPES.map((t) => (
					<option key={t.value} value={t.value}>
						{t.value}
					</option>
				))}
			</select>

			<div className="dual-range">
				<div className="dual-range-track" />
				<div className="dual-range-fill" style={{ left: pct(lo), right: `calc(100% - ${pct(hi)})` }} />
				<input type="range" aria-label="Minimum salary" min={0} max={sliderMax} step={step} value={lo} style={{ zIndex: lo > sliderMax * 0.9 ? 2 : 1 }} onChange={(e) => setMin(Math.min(Number(e.target.value), hi))} />
				<input type="range" aria-label="Maximum salary" min={0} max={sliderMax} step={step} value={hi} onChange={(e) => setMax(Math.max(Number(e.target.value), lo))} />
			</div>

			<div className="flex items-center gap-2">
				<input type="number" min={0} value={min ?? ""} onChange={(e) => setMin(num(e.target.value))} placeholder="Min" aria-label="Minimum salary" className={input} />
				<span>-</span>
				<input type="number" min={0} value={max ?? ""} onChange={(e) => setMax(num(e.target.value))} placeholder="Max" aria-label="Maximum salary" className={input} />
			</div>

			{has && (
				<p className="text-xs text-[#646970]">
					Shows as: {range} · {brief}
				</p>
			)}

			<input type="hidden" name="salaryMin" value={min ?? ""} />
			<input type="hidden" name="salaryMax" value={max ?? ""} />
			<input type="hidden" name="salaryRange" value={range} />
			<input type="hidden" name="salary" value={brief} />
		</div>
	);
};

export default SalaryField;
