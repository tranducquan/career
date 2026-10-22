"use client";

import { useState } from "react";
import { Country, State } from "country-state-city";
import { input } from "./styles";

type Props = { defaultCountry?: string; defaultLocation?: string };

// Tên nước lấy từ dữ liệu cố định của gói, nên server và client luôn giống nhau (không lệch hydration)
const allCountries = Country.getAllCountries()
	.map((c) => ({ code: c.isoCode, name: c.name }))
	.sort((a, b) => a.name.localeCompare(b.name, "en"));

const getProvinces = (country: string): string[] =>
	country
		? State.getStatesOfCountry(country)
				.map((s) => s.name)
				.sort((a, b) => a.localeCompare(b, "en"))
		: [];

const LocationPicker = ({ defaultCountry = "", defaultLocation = "" }: Props) => {
	const [country, setCountry] = useState(defaultCountry);
	const [location, setLocation] = useState(defaultLocation);

	const list = getProvinces(country);
	// Giá trị cũ không nằm trong danh sách (ví dụ "Hà Nội") vẫn được giữ khi sửa job
	const options = location && list.length > 0 && !list.includes(location) ? [location, ...list] : list;

	return (
		<div className="space-y-2">
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
				<option value="">Select a country</option>
				{allCountries.map((c) => (
					<option key={c.code} value={c.code}>
						{c.name}
					</option>
				))}
			</select>

			{country && options.length > 0 && (
				<select name="location" value={location} onChange={(e) => setLocation(e.target.value)} aria-label="Province or city" className={input}>
					<option value="">Select a province / city</option>
					{options.map((name) => (
						<option key={name} value={name}>
							{name}
						</option>
					))}
				</select>
			)}

			{/* Nước chưa có dữ liệu tỉnh/thành thì cho nhập tay */}
			{country && options.length === 0 && <input name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Province / city" aria-label="Province or city" className={input} />}

			{/* Chưa chọn quốc gia thì vẫn gửi location rỗng để sửa job có thể xoá giá trị cũ */}
			{!country && <input type="hidden" name="location" value="" />}
		</div>
	);
};

export default LocationPicker;
