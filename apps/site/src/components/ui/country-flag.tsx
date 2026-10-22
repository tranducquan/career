import { cn } from "@/lib/cn";
import { countryName } from "@/lib/country";

type Props = { code: string; showName?: boolean; className?: string };

const CountryFlag = ({ code, showName = false, className }: Props) => (
	<span className="inline-flex items-center gap-1.5">
		{/* eslint-disable-next-line @next/next/no-img-element */}
		<img src={`https://flagcdn.com/${code.toLowerCase()}.svg`} alt="" aria-hidden className={cn("w-7 aspect-3/2 shrink-0 object-cover border border-gray-100", className)} />
		{showName && <span>{countryName(code)}</span>}
	</span>
);

export default CountryFlag;

{
	/* <CountryFlag code={job.country} />           
<CountryFlag code={job.country} showName />  */
}
