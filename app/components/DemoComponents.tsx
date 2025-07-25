"use client";

import { type ReactNode, useMemo, useState, useEffect } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052FF] disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary:
      "bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)]",
    secondary:
      "bg-[var(--app-gray)] hover:bg-[var(--app-gray-dark)] text-[var(--app-foreground)]",
    outline:
      "border border-[var(--app-accent)] hover:bg-[var(--app-accent-light)] text-[var(--app-accent)]",
    ghost:
      "hover:bg-[var(--app-accent-light)] text-[var(--app-foreground-muted)]",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex items-center mr-2">{icon}</span>}
      {children}
    </button>
  );
}

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

function Card({ title, children, className = "", onClick }: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden transition-all hover:shadow-xl ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

type IconProps = {
  name:
    | "heart"
    | "star"
    | "check"
    | "plus"
    | "arrow-right"
    | "bitcoin"
    | "chart"
    | "table";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icons = {
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Heart</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Star</title>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Check</title>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Plus</title>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    "arrow-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Arrow Right</title>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    bitcoin: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <title>Bitcoin</title>
        <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546M16.1 11.2c.111-.794-.486-1.22-1.314-1.505l.268-1.076--.656-.164-.26 1.044c-.173-.043-.35-.084-.526-.123l.262-1.052-.656-.164-.268 1.076c-.143-.033-.283-.065-.418-.099l.001-.004-.906-.226-.175.7s.486.111.476.118c.265.066.313.241.305.38l-.306 1.228c.018.005.042.011.068.021-.022-.005-.045-.012-.068-.017l-.429 1.717c-.033.08-.115.202-.301.156.007.01-.476-.119-.476-.119l-.327.751.856.214c.159.040.315.082.469.121l-.271 1.088.655.164.268-1.076c.178.048.35.093.519.134l-.267 1.067.656.164.271-1.086c1.118.211 1.96.126 2.317-.884.288-.812-.014-1.28-.6-1.585.427-.099.748-.38.834-.961M14.705 15.16c-.203.814-1.577.374-2.022.263l.361-1.446c.445.111 1.873.33 1.661 1.183M14.911 11.15c-.185.741-1.33.365-1.701.272l.327-1.31c.37.093 1.567.266 1.374 1.038" />
      </svg>
    ),
    chart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Chart</title>
        <polyline points="22,6 13.5,15.5 8.5,10.5 2,17" />
        <polyline points="16,6 22,6 22,12" />
      </svg>
    ),
    table: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Table</title>
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
      </svg>
    ),
  };

  return (
    <span className={`inline-block ${sizeClasses[size]} ${className}`}>
      {icons[name]}
    </span>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
  placeholder?: string;
  suffix?: string;
  className?: string;
};

function InputField({
  label,
  value,
  onChange,
  type = "number",
  placeholder,
  suffix,
  className = "",
}: InputFieldProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-[var(--app-foreground)]">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--app-foreground-muted)] text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

type ChartDataPoint = {
  year: number;
  age: number;
  bitcoinHoldings: number;
  cumulativePurchases: number;
  totalBitcoin: number;
  bitcoinPrice: number;
  annualBudgetNeeded: number;
  isRetired: boolean;
  totalFiatValue: number;
};

type BitcoinChartProps = {
  currentAge: number;
  lifeExpectancy: number;
  initialBitcoin: number;
  annualBuyAmount: number;
  currentPrice: number;
  priceGrowth: number;
  inflation: number;
  retirementIncome: number;
};

type CalculationResults = {
  retirementAge: number;
  totalBTC: number;
  futurePrice: number;
  annualBudget: number;
  monthlyBudget: number;
  canRetire: boolean;
  chartData: ChartDataPoint[];
  totalFiatValue: number;
};

// Helper functions for calculations
const getGrowthFactor = (annualPriceGrowth: number): number => {
  return 1 + annualPriceGrowth / 100;
};

const getInflationFactor = (inflationRate: number): number => {
  return 1 + inflationRate / 100;
};

// Calculate total fiat needed for all future years (inflation-adjusted)
const calculateFiatWillNeedOverLife = (
  age: number,
  lifeExpectancy: number,
  annualBudget: number,
  inflation: number,
): number => {
  const inflationFactor = getInflationFactor(inflation);
  let totalFiatNeeded = 0;

  for (let currentAge = age; currentAge <= lifeExpectancy; currentAge++) {
    const yearsFromStart = currentAge - age;
    const indexedAnnualBudget =
      annualBudget * Math.pow(inflationFactor, yearsFromStart);
    totalFiatNeeded += indexedAnnualBudget;
  }

  return totalFiatNeeded;
};

const calculateOptimalRetirement = (
  currentAge: number,
  lifeExpectancy: number,
  initialBitcoin: number,
  annualBuyAmount: number,
  currentPrice: number,
  priceGrowth: number,
  inflation: number,
  retirementIncome: number,
): CalculationResults => {
  const growthFactor = getGrowthFactor(priceGrowth);
  const inflationFactor = getInflationFactor(inflation);

  let accumulatedSavingsBitcoin = initialBitcoin;
  let indexedAnnualBuyInFiat = annualBuyAmount;
  let retirementAge = lifeExpectancy;
  let canRetire = false;
  let bitcoinPriceAtRetirement = currentPrice;
  let annualBudgetAtRetirement = retirementIncome;
  let totalFiatValueAtRetirement = 0;

  const chartData: ChartDataPoint[] = [];

  // Iterate year by year to find retirement age
  for (let age = currentAge; age <= lifeExpectancy; age++) {
    const yearsFromStart = age - currentAge;
    const bitcoinPrice = currentPrice * Math.pow(growthFactor, yearsFromStart);
    const indexedAnnualBudget =
      retirementIncome * Math.pow(inflationFactor, yearsFromStart);

    // Calculate current total fiat value of Bitcoin holdings
    const accumulatedSavingsFiat = accumulatedSavingsBitcoin * bitcoinPrice;

    // Test if we can retire at this age (fiat-based comparison)
    if (!canRetire) {
      const pendingSavingsFiat = calculateFiatWillNeedOverLife(
        age,
        lifeExpectancy,
        retirementIncome,
        inflation,
      );

      if (pendingSavingsFiat <= accumulatedSavingsFiat) {
        canRetire = true;
        retirementAge = age;
        bitcoinPriceAtRetirement = bitcoinPrice;
        annualBudgetAtRetirement = indexedAnnualBudget;
        totalFiatValueAtRetirement = accumulatedSavingsFiat;
      }
    }

    // Add to chart data
    chartData.push({
      year: yearsFromStart,
      age: age,
      bitcoinHoldings: initialBitcoin,
      cumulativePurchases: accumulatedSavingsBitcoin - initialBitcoin,
      totalBitcoin: accumulatedSavingsBitcoin,
      bitcoinPrice: bitcoinPrice,
      annualBudgetNeeded: indexedAnnualBudget,
      isRetired: canRetire && age >= retirementAge,
      totalFiatValue: accumulatedSavingsFiat,
    });

    // If not yet retired, continue buying Bitcoin
    if (!canRetire || age < retirementAge) {
      if (age > currentAge) {
        // Don't buy in the starting year
        indexedAnnualBuyInFiat =
          annualBuyAmount * Math.pow(inflationFactor, yearsFromStart);
        const bitcoinToBuy = indexedAnnualBuyInFiat / bitcoinPrice;
        accumulatedSavingsBitcoin += bitcoinToBuy;
      }
    } else {
      // During retirement, sell Bitcoin for living expenses
      const bitcoinToSell = indexedAnnualBudget / bitcoinPrice;
      accumulatedSavingsBitcoin -= bitcoinToSell;
    }
  }

  const monthlyBudget = annualBudgetAtRetirement / 12;

  return {
    retirementAge,
    totalBTC: accumulatedSavingsBitcoin,
    futurePrice: bitcoinPriceAtRetirement,
    annualBudget: annualBudgetAtRetirement,
    monthlyBudget,
    canRetire,
    chartData,
    totalFiatValue: totalFiatValueAtRetirement,
  };
};

function BitcoinChart({
  currentAge,
  lifeExpectancy,
  initialBitcoin,
  annualBuyAmount,
  currentPrice,
  priceGrowth,
  inflation,
  retirementIncome,
}: BitcoinChartProps) {
  const calculationResults = useMemo(() => {
    return calculateOptimalRetirement(
      currentAge,
      lifeExpectancy,
      initialBitcoin,
      annualBuyAmount,
      currentPrice,
      priceGrowth,
      inflation,
      retirementIncome,
    );
  }, [
    currentAge,
    lifeExpectancy,
    initialBitcoin,
    annualBuyAmount,
    currentPrice,
    priceGrowth,
    inflation,
    retirementIncome,
  ]);

  const chartData = calculationResults.chartData;
  const maxBitcoin = Math.max(...chartData.map((d) => d.totalBitcoin));
  const minBitcoin = Math.min(...chartData.map((d) => d.totalBitcoin));
  const chartHeight = 200;
  const chartWidth = 400;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };

  const getX = (year: number) => {
    const totalYears = lifeExpectancy - currentAge;
    return (
      padding.left +
      (year / totalYears) * (chartWidth - padding.left - padding.right)
    );
  };

  const getY = (bitcoin: number) => {
    const range = maxBitcoin - minBitcoin || 1;
    const normalized = (bitcoin - minBitcoin) / range;
    return (
      chartHeight -
      padding.bottom -
      normalized * (chartHeight - padding.top - padding.bottom)
    );
  };

  const pathData = chartData
    .map((point, index) => {
      const x = getX(point.year);
      const y = getY(point.totalBitcoin);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="w-full h-64 flex items-center justify-center bg-[var(--app-gray)] rounded-lg p-4">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="max-w-full max-h-full"
      >
        {/* Grid lines */}
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--app-foreground-muted)"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={chartHeight - padding.bottom}
          stroke="var(--app-foreground-muted)"
          strokeWidth="1"
        />

        {/* X-axis */}
        <line
          x1={padding.left}
          y1={chartHeight - padding.bottom}
          x2={chartWidth - padding.right}
          y2={chartHeight - padding.bottom}
          stroke="var(--app-foreground-muted)"
          strokeWidth="1"
        />

        {/* Chart line */}
        <path
          d={pathData}
          fill="none"
          stroke="#f97316"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {chartData.map((point, index) => (
          <g key={index}>
            <circle
              cx={getX(point.year)}
              cy={getY(point.totalBitcoin)}
              r="4"
              fill={point.isRetired ? "#ef4444" : "#f97316"}
              stroke="white"
              strokeWidth="2"
            />

            {/* Age labels on X-axis - show every few years to avoid crowding */}
            {index % Math.max(1, Math.floor(chartData.length / 8)) === 0 && (
              <text
                x={getX(point.year)}
                y={chartHeight - padding.bottom + 15}
                textAnchor="middle"
                fontSize="10"
                fill="var(--app-foreground-muted)"
              >
                {point.age}
              </text>
            )}
          </g>
        ))}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const value = minBitcoin + (maxBitcoin - minBitcoin) * ratio;
          const y =
            chartHeight -
            padding.bottom -
            ratio * (chartHeight - padding.top - padding.bottom);

          return (
            <g key={ratio}>
              <text
                x={padding.left - 10}
                y={y + 3}
                textAnchor="end"
                fontSize="10"
                fill="var(--app-foreground-muted)"
              >
                ₿{value.toFixed(3)}
              </text>
              <line
                x1={padding.left - 5}
                y1={y}
                x2={padding.left}
                y2={y}
                stroke="var(--app-foreground-muted)"
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* Chart title */}
        <text
          x={chartWidth / 2}
          y={15}
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="var(--app-foreground)"
        >
          Bitcoin Accumulation Over Time
        </text>

        {/* X-axis label */}
        <text
          x={chartWidth / 2}
          y={chartHeight - 5}
          textAnchor="middle"
          fontSize="10"
          fill="var(--app-foreground-muted)"
        >
          Age
        </text>

        {/* Y-axis label */}
        <text
          x={15}
          y={chartHeight / 2}
          textAnchor="middle"
          fontSize="10"
          fill="var(--app-foreground-muted)"
          transform={`rotate(-90, 15, ${chartHeight / 2})`}
        >
          Bitcoin Holdings (₿)
        </text>

        {/* Retirement age marker */}
        {calculationResults.canRetire && (
          <line
            x1={getX(calculationResults.retirementAge - currentAge)}
            y1={padding.top}
            x2={getX(calculationResults.retirementAge - currentAge)}
            y2={chartHeight - padding.bottom}
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.7"
          />
        )}
      </svg>
    </div>
  );
}

function BitcoinTable({
  currentAge,
  lifeExpectancy,
  initialBitcoin,
  annualBuyAmount,
  currentPrice,
  priceGrowth,
  inflation,
  retirementIncome,
}: BitcoinChartProps) {
  const calculationResults = useMemo(() => {
    return calculateOptimalRetirement(
      currentAge,
      lifeExpectancy,
      initialBitcoin,
      annualBuyAmount,
      currentPrice,
      priceGrowth,
      inflation,
      retirementIncome,
    );
  }, [
    currentAge,
    lifeExpectancy,
    initialBitcoin,
    annualBuyAmount,
    currentPrice,
    priceGrowth,
    inflation,
    retirementIncome,
  ]);

  const tableData = calculationResults.chartData;

  return (
    <div className="w-full bg-[var(--app-gray)] rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-2">
          Year-by-Year Bitcoin Retirement Plan
        </h3>
        <p className="text-sm text-[var(--app-foreground-muted)]">
          Track your Bitcoin accumulation journey from age {currentAge} to{" "}
          {lifeExpectancy}
        </p>
      </div>

      {/* Mobile-friendly scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-[var(--app-card-border)]">
              <th className="text-left py-3 px-2 font-medium text-[var(--app-foreground)]">
                Age
              </th>
              <th className="text-left py-3 px-2 font-medium text-[var(--app-foreground)]">
                Phase
              </th>
              <th className="text-right py-3 px-2 font-medium text-[var(--app-foreground)]">
                Bitcoin Holdings
              </th>
              <th className="text-right py-3 px-2 font-medium text-[var(--app-foreground)]">
                Bitcoin Price
              </th>
              <th className="text-right py-3 px-2 font-medium text-[var(--app-foreground)]">
                Portfolio Value
              </th>
              <th className="text-right py-3 px-2 font-medium text-[var(--app-foreground)]">
                Annual Budget
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-[var(--app-card-border)] hover:bg-[var(--app-card-bg)] transition-colors ${
                  row.isRetired
                    ? "bg-red-50 dark:bg-red-900/10"
                    : "bg-orange-50 dark:bg-orange-900/10"
                }`}
              >
                <td className="py-3 px-2 font-medium text-[var(--app-foreground)]">
                  {row.age}
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      row.isRetired
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                    }`}
                  >
                    {row.isRetired ? "🏖️ Retired" : "💼 Working"}
                  </span>
                </td>
                <td className="py-3 px-2 text-right font-mono text-[var(--app-foreground)]">
                  ₿{row.totalBitcoin.toFixed(6)}
                </td>
                <td className="py-3 px-2 text-right font-mono text-[var(--app-foreground)]">
                  ${row.bitcoinPrice.toLocaleString()}
                </td>
                <td className="py-3 px-2 text-right font-mono text-[var(--app-foreground)] font-semibold">
                  ${row.totalFiatValue.toLocaleString()}
                </td>
                <td className="py-3 px-2 text-right font-mono text-[var(--app-foreground-muted)]">
                  ${row.annualBudgetNeeded.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile summary cards for smaller screens */}
      <div className="block sm:hidden mt-4 space-y-3">
        <h4 className="font-medium text-[var(--app-foreground)] mb-3">
          Summary by Decade
        </h4>
        {tableData
          .filter(
            (_, index) =>
              index % 10 === 0 ||
              tableData[index]?.age === calculationResults.retirementAge,
          )
          .map((row, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border border-[var(--app-card-border)] ${
                row.isRetired
                  ? "bg-red-50 dark:bg-red-900/10"
                  : "bg-orange-50 dark:bg-orange-900/10"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-[var(--app-foreground)]">
                  Age {row.age}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    row.isRetired
                      ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                  }`}
                >
                  {row.isRetired ? "🏖️ Retired" : "💼 Working"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-[var(--app-foreground-muted)]">
                    Bitcoin:
                  </span>
                  <div className="font-mono text-[var(--app-foreground)]">
                    ₿{row.totalBitcoin.toFixed(4)}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--app-foreground-muted)]">
                    BTC Price:
                  </span>
                  <div className="font-mono text-[var(--app-foreground)]">
                    ${row.bitcoinPrice.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--app-foreground-muted)]">
                    Portfolio:
                  </span>
                  <div className="font-mono text-[var(--app-foreground)] font-semibold">
                    ${row.totalFiatValue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--app-foreground-muted)]">
                    Budget:
                  </span>
                  <div className="font-mono text-[var(--app-foreground-muted)]">
                    ${row.annualBudgetNeeded.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--app-foreground-muted)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-400"></div>
          <span>Accumulation Phase</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <span>Retirement Phase</span>
        </div>
      </div>
    </div>
  );
}

export function BitcoinCalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [lifeExpectancy, setLifeExpectancy] = useState("86");
  const [bitcoinHolding, setBitcoinHolding] = useState("0.50");
  const [annualBuy, setAnnualBuy] = useState("0");
  const [priceGrowth, setPriceGrowth] = useState("20");
  const [inflation, setInflation] = useState("2.0");
  const [retirementIncome, setRetirementIncome] = useState("120000");
  const [currentPrice, setCurrentPrice] = useState("118328.79");
  const [activeView, setActiveView] = useState<"chart" | "table">("chart");

  // Fetch Bitcoin price on component mount
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coinbase.com/v2/exchange-rates?currency=BTC",
        );
        const data = await response.json();
        const price = parseFloat(data.data.rates.USD);
        setCurrentPrice(price.toFixed(2));
      } catch (error) {
        console.error("Failed to fetch Bitcoin price:", error);
        // Keep default price if fetch fails
      }
    };

    fetchBitcoinPrice();
  }, []);

  const calculations = useMemo(() => {
    const age = parseInt(currentAge) || 30;
    const expectancy = parseInt(lifeExpectancy) || 86;
    const btcAmount = parseFloat(bitcoinHolding) || 0;
    const buyAmount = parseFloat(annualBuy) || 0;
    const growth = parseFloat(priceGrowth) || 20;
    const inflationRate = parseFloat(inflation) || 2;
    const income = parseFloat(retirementIncome) || 120000;
    const price = parseFloat(currentPrice) || 118328;

    const results = calculateOptimalRetirement(
      age,
      expectancy,
      btcAmount,
      buyAmount,
      price,
      growth,
      inflationRate,
      income,
    );

    return {
      retirementAge: results.retirementAge,
      totalBTC: results.totalBTC.toFixed(8),
      futurePrice: results.futurePrice.toFixed(2),
      annualBudget: results.annualBudget.toFixed(0),
      monthlyBudget: results.monthlyBudget.toFixed(0),
      canRetire: results.canRetire,
      totalFiatValue: results.totalFiatValue.toFixed(0),
    };
  }, [
    currentAge,
    lifeExpectancy,
    bitcoinHolding,
    annualBuy,
    priceGrowth,
    inflation,
    retirementIncome,
    currentPrice,
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Bitcoin icon */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <Icon name="bitcoin" size="lg" className="text-orange-500" />
          <h1 className="text-2xl font-bold text-[var(--app-foreground)]">
            Bitcoin Retirement Calculator
          </h1>
        </div>
        <p className="text-[var(--app-foreground-muted)]">
          Plan your Bitcoin-powered retirement
        </p>
      </div>

      {/* Input Fields */}
      <Card title="Your Information">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InputField
            label="Current age"
            value={currentAge}
            onChange={setCurrentAge}
            placeholder="30"
          />
          <InputField
            label="Life expectancy"
            value={lifeExpectancy}
            onChange={setLifeExpectancy}
            placeholder="86"
          />
          <InputField
            label="Amount of Bitcoin you hold"
            value={bitcoinHolding}
            onChange={setBitcoinHolding}
            placeholder="0.50"
            suffix="₿"
          />
          <InputField
            label="Annual estimated buy"
            value={annualBuy}
            onChange={setAnnualBuy}
            placeholder="0"
            suffix="$"
          />
          <InputField
            label="Price annual growth"
            value={priceGrowth}
            onChange={setPriceGrowth}
            placeholder="20"
            suffix="%"
          />
          <InputField
            label="Annual inflation"
            value={inflation}
            onChange={setInflation}
            placeholder="2.0"
            suffix="%"
          />
        </div>
        <InputField
          label="Desired annual retirement income"
          value={retirementIncome}
          onChange={setRetirementIncome}
          placeholder="120000"
          suffix="$"
          className="mb-4"
        />
      </Card>

      {/* Results */}
      <Card title="Your Retirement Prediction">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <p className="text-sm text-[var(--app-foreground-muted)]">
              Your retirement age:
            </p>
            <p className="text-xl font-bold text-[var(--app-foreground)]">
              {calculations.retirementAge}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[var(--app-foreground-muted)]">
              Current Bitcoin Price:
            </p>
            <p className="text-xl font-bold text-[var(--app-foreground)]">
              ${parseFloat(currentPrice).toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[var(--app-foreground-muted)]">
              Total Savings:
            </p>
            <p className="text-xl font-bold text-[var(--app-foreground)]">
              ₿{calculations.totalBTC}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[var(--app-foreground-muted)]">
              Bitcoin price when you retire:
            </p>
            <p className="text-xl font-bold text-[var(--app-foreground)]">
              ${parseFloat(calculations.futurePrice).toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[var(--app-foreground-muted)]">
              Total Portfolio Value:
            </p>
            <p className="text-xl font-bold text-[var(--app-foreground)]">
              ${parseFloat(calculations.totalFiatValue).toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-[var(--app-foreground-muted)]">
              Annual Retirement Budget:
            </p>
            <p className="text-xl font-bold text-[var(--app-foreground)]">
              ${parseFloat(calculations.annualBudget).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Retirement Status */}
        <div className="mb-4 p-3 rounded-lg bg-[var(--app-accent-light)]">
          <p className="text-sm font-medium text-[var(--app-foreground)]">
            {calculations.canRetire
              ? `🎉 You can retire at age ${calculations.retirementAge}! Your Bitcoin will be worth $${parseFloat(calculations.totalFiatValue).toLocaleString()}.`
              : "❌ Cannot retire with current plan. Try increasing your Bitcoin purchases or reducing retirement income."}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-2 mb-4">
          <Button
            variant={activeView === "chart" ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveView("chart")}
            icon={<Icon name="chart" size="sm" />}
          >
            Chart view
          </Button>
          <Button
            variant={activeView === "table" ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveView("table")}
            icon={<Icon name="table" size="sm" />}
          >
            Table view
          </Button>
        </div>

        {/* Chart/Table View */}
        {activeView === "chart" ? (
          <BitcoinChart
            currentAge={parseInt(currentAge) || 30}
            lifeExpectancy={parseInt(lifeExpectancy) || 86}
            initialBitcoin={parseFloat(bitcoinHolding) || 0}
            annualBuyAmount={parseFloat(annualBuy) || 0}
            currentPrice={parseFloat(currentPrice)}
            priceGrowth={parseFloat(priceGrowth) || 20}
            inflation={parseFloat(inflation) || 2}
            retirementIncome={parseFloat(retirementIncome) || 120000}
          />
        ) : (
          <BitcoinTable
            currentAge={parseInt(currentAge) || 30}
            lifeExpectancy={parseInt(lifeExpectancy) || 86}
            initialBitcoin={parseFloat(bitcoinHolding) || 0}
            annualBuyAmount={parseFloat(annualBuy) || 0}
            currentPrice={parseFloat(currentPrice)}
            priceGrowth={parseFloat(priceGrowth) || 20}
            inflation={parseFloat(inflation) || 2}
            retirementIncome={parseFloat(retirementIncome) || 120000}
          />
        )}
      </Card>
    </div>
  );
}
