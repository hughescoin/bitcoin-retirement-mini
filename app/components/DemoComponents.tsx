"use client";

import {
  type ReactNode,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useAccount } from "wagmi";
import {
  Transaction,
  TransactionButton,
  TransactionToast,
  TransactionToastAction,
  TransactionToastIcon,
  TransactionToastLabel,
  TransactionError,
  TransactionResponse,
  TransactionStatusAction,
  TransactionStatusLabel,
  TransactionStatus,
} from "@coinbase/onchainkit/transaction";
import { useNotification } from "@coinbase/onchainkit/minikit";

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
};

type BitcoinChartProps = {
  currentAge: number;
  retirementAge: number;
  initialBitcoin: number;
  annualBuyAmount: number;
  currentPrice: number;
};

function BitcoinChart({
  currentAge,
  retirementAge,
  initialBitcoin,
  annualBuyAmount,
  currentPrice,
}: BitcoinChartProps) {
  const chartData = useMemo(() => {
    const data: ChartDataPoint[] = [];
    let cumulativePurchases = 0;

    for (let age = currentAge; age <= retirementAge; age++) {
      const year = age - currentAge;
      const annualBitcoinPurchase =
        annualBuyAmount > 0 ? annualBuyAmount / currentPrice : 0;

      if (age > currentAge) {
        cumulativePurchases += annualBitcoinPurchase;
      }

      const totalBitcoin = initialBitcoin + cumulativePurchases;

      data.push({
        year,
        age,
        bitcoinHoldings: initialBitcoin,
        cumulativePurchases,
        totalBitcoin,
      });
    }

    return data;
  }, [
    currentAge,
    retirementAge,
    initialBitcoin,
    annualBuyAmount,
    currentPrice,
  ]);

  const maxBitcoin = Math.max(...chartData.map((d) => d.totalBitcoin));
  const minBitcoin = Math.min(...chartData.map((d) => d.totalBitcoin));
  const chartHeight = 200;
  const chartWidth = 400;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };

  const getX = (year: number) => {
    const totalYears = retirementAge - currentAge;
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
              fill="#f97316"
              stroke="white"
              strokeWidth="2"
            />

            {/* Age labels on X-axis */}
            <text
              x={getX(point.year)}
              y={chartHeight - padding.bottom + 15}
              textAnchor="middle"
              fontSize="10"
              fill="var(--app-foreground-muted)"
            >
              {point.age}
            </text>
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
                ₿{value.toFixed(2)}
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
        <g>
          <line
            x1={getX(retirementAge - currentAge)}
            y1={padding.top}
            x2={getX(retirementAge - currentAge)}
            y2={chartHeight - padding.bottom}
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.7"
          />
          <text
            x={getX(retirementAge - currentAge)}
            y={padding.top - 5}
            textAnchor="middle"
            fontSize="10"
            fill="#ef4444"
            fontWeight="bold"
          >
            Retirement
          </text>
        </g>
      </svg>
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
    const btcAmount = parseFloat(bitcoinHolding) || 0;
    const buyAmount = parseFloat(annualBuy) || 0;
    const growth = parseFloat(priceGrowth) || 20;
    const inflationRate = parseFloat(inflation) || 2;
    const income = parseFloat(retirementIncome) || 120000;
    const price = parseFloat(currentPrice) || 118328;

    const retirementAge = 47; // Based on the image example
    const yearsToRetirement = Math.max(0, retirementAge - age);

    // Calculate future Bitcoin holdings
    const additionalBTC =
      buyAmount > 0 ? (buyAmount / price) * yearsToRetirement : 0;
    const totalBTC = btcAmount + additionalBTC;

    // Calculate Bitcoin price at retirement
    const futurePrice = price * Math.pow(1 + growth / 100, yearsToRetirement);

    // Calculate total savings value
    const totalValue = totalBTC * futurePrice;

    // Calculate retirement budgets (adjusted for inflation)
    const inflationMultiplier = Math.pow(
      1 + inflationRate / 100,
      yearsToRetirement,
    );
    const adjustedIncome = income * inflationMultiplier;
    const annualBudget = adjustedIncome;
    const monthlyBudget = annualBudget / 12;

    return {
      retirementAge,
      yearsToRetirement,
      totalBTC: totalBTC.toFixed(8),
      futurePrice: futurePrice.toFixed(2),
      totalValue: totalValue.toFixed(0),
      annualBudget: annualBudget.toFixed(0),
      monthlyBudget: monthlyBudget.toFixed(0),
    };
  }, [
    currentAge,
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
              Annual Retirement Budget:
            </p>
            <p className="text-xl font-bold text-[var(--app-foreground)]">
              ₿
              {(
                parseFloat(calculations.annualBudget) /
                parseFloat(calculations.futurePrice)
              ).toFixed(8)}
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
              Monthly Retirement Budget:
            </p>
            <p className="text-xl font-bold text-[var(--app-foreground)]">
              ₿
              {(
                parseFloat(calculations.monthlyBudget) /
                parseFloat(calculations.futurePrice)
              ).toFixed(8)}
            </p>
          </div>
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
            retirementAge={calculations.retirementAge}
            initialBitcoin={parseFloat(bitcoinHolding) || 0}
            annualBuyAmount={parseFloat(annualBuy) || 0}
            currentPrice={parseFloat(currentPrice)}
          />
        ) : (
          <div className="bg-[var(--app-gray)] rounded-lg p-4 h-64 flex items-center justify-center">
            <div className="text-center text-[var(--app-foreground-muted)]">
              <Icon
                name="table"
                size="lg"
                className="mx-auto mb-2 text-orange-500"
              />
              <p className="text-sm">Retirement Planning Table</p>
              <p className="text-xs mt-1">
                Detailed year-by-year breakdown coming next
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Optional Transaction Card */}
      <BitcoinTransactionCard />
    </div>
  );
}

function BitcoinTransactionCard() {
  const { address } = useAccount();
  const sendNotification = useNotification();

  // Example transaction call - sending 0 ETH to self
  const calls = useMemo(
    () =>
      address
        ? [
            {
              to: address,
              data: "0x" as `0x${string}`,
              value: BigInt(0),
            },
          ]
        : [],
    [address],
  );

  const handleSuccess = useCallback(
    async (response: TransactionResponse) => {
      const transactionHash = response.transactionReceipts[0].transactionHash;

      console.log(`Transaction successful: ${transactionHash}`);

      await sendNotification({
        title: "Bitcoin Transaction Complete! ₿",
        body: `Your Bitcoin retirement plan transaction is confirmed: ${transactionHash.slice(0, 8)}...`,
      });
    },
    [sendNotification],
  );

  return (
    <Card title="Start Your Bitcoin Journey">
      <div className="space-y-4">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          Ready to begin your Bitcoin retirement journey? Make your first
          sponsored transaction with{" "}
          <a
            href="https://onchainkit.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0052FF] hover:underline"
          >
            OnchainKit
          </a>
          .
        </p>

        <div className="flex flex-col items-center">
          {address ? (
            <Transaction
              calls={calls}
              onSuccess={handleSuccess}
              onError={(error: TransactionError) =>
                console.error("Transaction failed:", error)
              }
            >
              <TransactionButton className="text-white text-md" />
              <TransactionStatus>
                <TransactionStatusAction />
                <TransactionStatusLabel />
              </TransactionStatus>
              <TransactionToast className="mb-4">
                <TransactionToastIcon />
                <TransactionToastLabel />
                <TransactionToastAction />
              </TransactionToast>
            </Transaction>
          ) : (
            <p className="text-yellow-400 text-sm text-center mt-2">
              Connect your wallet to start your Bitcoin retirement plan
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
