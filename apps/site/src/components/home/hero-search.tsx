"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import Button from "../ui/button";
import CountryPicker, { type CountryOption } from "../jobs/country-picker";

const HeroSearch = ({ countries }: { countries: CountryOption[] }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [q, setQ] = useState("");
	const [country, setCountry] = useState<string | undefined>();

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		const sp = new URLSearchParams();
		if (q.trim()) sp.set("q", q.trim());
		if (country) sp.set("country", country);
		const qs = sp.toString();
		startTransition(() => router.push(qs ? `/jobs?${qs}` : "/jobs"));
	};

	return (
		<form onSubmit={submit} role="search" className="mt-6 flex flex-col gap-2 rounded-xl bg-white p-3 shadow-md md:mt-8 md:flex-row md:items-center md:gap-0">
			<label className="flex flex-1 items-center gap-3 px-3 py-2 md:border-r md:border-gray-100">
				<Search className="size-6 shrink-0 text-primary-500" strokeWidth={1.75} aria-hidden />
				<span className="sr-only">Job title or keyword</span>
				<input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Job title, keyword..." className="w-full min-w-0 bg-transparent outline-none placeholder:text-gray-400" />
			</label>

			<div className="flex flex-1">
				<CountryPicker options={countries} value={country} onChange={setCountry} />
			</div>

			<Button type="submit" disabled={isPending} className="md:ml-2 ">
				{isPending && <Loader2 className="size-4 animate-spin" aria-hidden />}
				{isPending ? "Searching..." : "Find Job"}
			</Button>
		</form>
	);
};

export default HeroSearch;
