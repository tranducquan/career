"use client";

import { useEffect, useState } from "react";
import { countries } from "@repo/db/validation";
import { input } from "./styles";

type Props = { defaultCountry?: string; defaultLocation?: string };

const LocationPicker = ({ defaultCountry = "", defaultLocation = "" }: Props) => {
	const [country, setCountry] = useState(defaultCountry);
	const [location, setLocation] = useState(defaultLocation);
	const [states, setStates] = useState<string[]>([]);

	useEffect(() => {
		if (!country) return;
		let cancelled = false;
		import("country-state-city").then(({ State }) => {
			if (cancelled) return;
			setStates(
				State.getStatesOfCountry(country)
					.map((s) => s.name)
					.sort((a, b) => a.localeCompare(b)),
			);
		});
		return () => {
			cancelled = true;
		};
	}, [country]);

	const options = country ? states : [];
	// Giá trị cũ không nằm trong danh sách vẫn được giữ, không bị mất khi sửa job
	const list = location && !options.includes(location) ? [location, ...options] : options;

	return (
		<>
			<select
				name="country"
				value={country}
				onChange={(e) => {
					setCountry(e.target.value);
					setLocation("");
				}}
				aria-label="Country"
				className={input}
			>
				<option value="">Choose a country</option>
				{countries.map((c) => (
					<option key={c.code} value={c.code}>
						{c.name}
					</option>
				))}
			</select>

			{country && list.length > 0 ? (
				<select name="location" value={location} onChange={(e) => setLocation(e.target.value)} aria-label="Province or city" className={`${input} mt-2`}>
					<option value="">Choose a province or city</option>
					{list.map((name) => (
						<option key={name} value={name}>
							{name}
						</option>
					))}
				</select>
			) : (
				// Quốc gia chưa có dữ liệu tỉnh/thành thì cho nhập tay
				<input name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Province or city" aria-label="Province or city" className={`${input} mt-2`} />
			)}
		</>
	);
};

export default LocationPicker;
