export interface City {
  name: string;
  code: string;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  currency: string;
}

export interface Member {
  name: string;
  email: string;
  role: string;
  status: string;
  badge: string;
}

export interface GroupedCar {
  label: string;
  value: string;
  items: { label: string; value: string }[];
}

export interface ArabicCountry {
  name: string;
  code: string;
}

export interface ArabicCity {
  id: number;
  name: string;
}

export interface ArabicGroupedRegion {
  region: string;
  cities: { name: string; code: string }[];
}

export interface BrowserOption {
  id: string;
  name: string;
  engine: string;
}

export interface TableMember {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Collaborator {
  id: number;
  name: string;
  team: string;
  avatar: string;
}

export interface GroupedPermissionCategory {
  category: string;
  permissions: { name: string; key: string }[];
}

export const PRIMITIVE_CITIES: string[] = [
  'New York',
  'Rome',
  'London',
  'Istanbul',
  'Paris',
  'Tokyo',
];

export const OBJECT_CITIES: City[] = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
  { name: 'Tokyo', code: 'TOK' },
];

export const COUNTRIES: Country[] = [
  { name: 'Australia', code: 'AU', flag: '🇦🇺', currency: 'AUD' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷', currency: 'BRL' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', currency: 'CAD' },
  { name: 'Egypt', code: 'EG', flag: '🇪🇬', currency: 'EGP' },
  { name: 'France', code: 'FR', flag: '🇫🇷', currency: 'EUR' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', currency: 'EUR' },
  { name: 'India', code: 'IN', flag: '🇮🇳', currency: 'INR' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', currency: 'JPY' },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', currency: 'SAR' },
  { name: 'United Kingdom', code: 'UK', flag: '🇬🇧', currency: 'GBP' },
  { name: 'United States', code: 'US', flag: '🇺🇸', currency: 'USD' },
];

export const GROUPED_CARS: GroupedCar[] = [
  {
    label: 'Germany',
    value: 'de',
    items: [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Mercedes-Benz', value: 'Mercedes' },
      { label: 'Porsche', value: 'Porsche' },
    ],
  },
  {
    label: 'USA',
    value: 'us',
    items: [
      { label: 'Cadillac', value: 'Cadillac' },
      { label: 'Chevrolet', value: 'Chevrolet' },
      { label: 'Ford', value: 'Ford' },
      { label: 'Tesla', value: 'Tesla' },
    ],
  },
  {
    label: 'Japan',
    value: 'jp',
    items: [
      { label: 'Honda', value: 'Honda' },
      { label: 'Nissan', value: 'Nissan' },
      { label: 'Toyota', value: 'Toyota' },
    ],
  },
];

export const TEAM_MEMBERS: Member[] = [
  {
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    role: 'Lead Architect',
    status: 'online',
    badge: 'bg-primary',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Frontend Engineer',
    status: 'busy',
    badge: 'bg-danger',
  },
  {
    name: 'Alex Rivera',
    email: 'alex@example.com',
    role: 'Product Designer',
    status: 'away',
    badge: 'bg-warning text-dark',
  },
  {
    name: 'Elena Rostova',
    email: 'elena@example.com',
    role: 'DevOps Engineer',
    status: 'offline',
    badge: 'bg-secondary',
  },
];

export const ARABIC_COUNTRIES: ArabicCountry[] = [
  { name: 'المملكة العربية السعودية', code: 'SA' },
  { name: 'الإمارات العربية المتحدة', code: 'AE' },
  { name: 'جمهورية مصر العربية', code: 'EG' },
  { name: 'المملكة الأردنية الهاشمية', code: 'JO' },
  { name: 'دولة الكويت', code: 'KW' },
  { name: 'دولة قطر', code: 'QA' },
  { name: 'سلطنة عمان', code: 'OM' },
];

export const ARABIC_CITIES: ArabicCity[] = [
  { id: 1, name: 'الرياض' },
  { id: 2, name: 'دبي' },
  { id: 3, name: 'القاهرة' },
  { id: 4, name: 'عمان' },
  { id: 5, name: 'الدوحة' },
  { id: 6, name: 'مسقط' },
];

export const ARABIC_GROUPED_REGIONS: ArabicGroupedRegion[] = [
  {
    region: 'دول الخليج العربي',
    cities: [
      { name: 'الرياض', code: 'RUH' },
      { name: 'أبوظبي', code: 'AUH' },
      { name: 'الكويت', code: 'KWI' },
    ],
  },
  {
    region: 'بلاد الشام وشمال أفريقيا',
    cities: [
      { name: 'القاهرة', code: 'CAI' },
      { name: 'عمان', code: 'AMM' },
      { name: 'بيروت', code: 'BEY' },
    ],
  },
];

export const CASCADING_COUNTRIES = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Germany', code: 'DE' },
];

export const CASCADING_ALL_CITIES = [
  { id: 1, countryCode: 'US', name: 'New York' },
  { id: 2, countryCode: 'US', name: 'San Francisco' },
  { id: 3, countryCode: 'UK', name: 'London' },
  { id: 4, countryCode: 'UK', name: 'Manchester' },
  { id: 5, countryCode: 'DE', name: 'Berlin' },
  { id: 6, countryCode: 'DE', name: 'Munich' },
];

export const BROWSERS: BrowserOption[] = [
  { id: 'chrome', name: 'Google Chrome', engine: 'Blink' },
  { id: 'firefox', name: 'Mozilla Firefox', engine: 'Gecko' },
  { id: 'safari', name: 'Apple Safari', engine: 'WebKit' },
  { id: 'edge', name: 'Microsoft Edge', engine: 'Blink' },
];

export const TABLE_MEMBERS: TableMember[] = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'editor' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'viewer' },
];

export const ROLE_OPTIONS = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

export const DEPARTMENTS = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Product Design' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Sales & Growth' },
];

export const COLLABORATORS: Collaborator[] = [
  {
    id: 1,
    name: 'Sarah Connor',
    team: 'Platform',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces',
  },
  {
    id: 2,
    name: 'John Doe',
    team: 'Mobile',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces',
  },
  {
    id: 3,
    name: 'Alex Rivera',
    team: 'Core UI',
    avatar:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=64&h=64&fit=crop&crop=faces',
  },
];

export const THEME_OPTIONS = [
  { id: 'light', label: 'Light Theme' },
  { id: 'dark', label: 'Dark Theme' },
  { id: 'system', label: 'System Default' },
];

export const PAYMENT_METHODS = [
  { name: 'Credit / Debit Card', code: 'cc' },
  { name: 'PayPal', code: 'pp' },
  { name: 'Apple Pay / Google Pay', code: 'wallet' },
  { name: 'Bank Wire Transfer', code: 'bank' },
];

export const ACCOUNT_PLANS = [
  { id: 'free', name: 'Free Starter' },
  { id: 'pro', name: 'Professional ($29/mo)' },
  { id: 'enterprise', name: 'Enterprise Cloud' },
];

export const GROUPED_PERMISSIONS: GroupedPermissionCategory[] = [
  {
    category: 'User Management',
    permissions: [
      { name: 'View Users', key: 'usr_view' },
      { name: 'Create Users', key: 'usr_create' },
      { name: 'Delete Users', key: 'usr_del' },
    ],
  },
  {
    category: 'Billing & Payments',
    permissions: [
      { name: 'View Invoices', key: 'bil_view' },
      { name: 'Manage Subscriptions', key: 'bil_manage' },
      { name: 'Refund Transactions', key: 'bil_refund' },
    ],
  },
];
