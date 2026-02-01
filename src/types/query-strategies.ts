
export interface QueryStrategyProps<T = any> {
  data: T;
  queryId?: string;
}

export interface ScrBacenResult {
  document: string;
  documentType: string;
  consultationDateTime: string;
  pdfUrl?: string;
  score: {
    value: number;
    band: string;
  };
  databaseDate: string;
  relationshipStartDate: string;
  institutionsCount: number;
  operationsCount: number;
  creditSummary: {
    creditToExpire: CreditSummaryItem;
    expiredCredit: CreditSummaryItem;
    creditLimit: CreditSummaryItem;
    loss: CreditSummaryItem;
  };
  operations: OperationItem[];
  hasRestrictions: boolean;
  totalRestrictiveValue: number;
}

interface CreditSummaryItem {
  description: string;
  value: number;
  percentage: number;
}

interface OperationItem {
  modalityCode: string;
  modalityDescription: string;
  subModalityCode: string;
  subModalityDescription: string;
  totalValue: number;
  percentage: number;
  maturities: MaturityItem[];
}

interface MaturityItem {
  code: string;
  description: string;
  value: number;
  percentage: number;
  isRestrictive: boolean;
}

export interface LocalizaResult {
  protocol: string;
  basicInfo: {
    name: string;
    document: string;
    birthDate: string;
    gender: string;
    motherName: string;
    status: string;
  };
  contact: {
    mainPhone: string;
    mobilePhones: string[];
    landlinePhones: string[];
    businessPhones: string[];
    emails: string[];
  };
  addresses: AddressItem[];
  relations: {
    relatives: RelativeItem[];
    residents: any[];
    neighbors: any[];
    partners: any[];
  };
}

interface AddressItem {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  source: string;
}

interface RelativeItem {
  name: string;
  document: string;
  type: string;
  relation: string;
}

export interface CompletaPlusCpfResult {
  protocol: string;
  totalDebts: number;
  totalQueries: number;
  person: {
    name: string;
    document: string;
    birthDate: string;
    revenueStatus: string;
    motherName: string;
    email: string;
    gender: string;
  };
  debts: Array<{
    value: string;
    contract: string;
    origin: string;
    date: string;
  }>;
  queries: Array<{
    date: string;
    entity: string;
  }>;
  veicular: any;
}

export interface CompletaPlusCnpjResult {
  protocol: string;
  totalDebts: number;
  totalProtests: number;
  totalQueries: number;
  totalBadChecks: number;
  company: {
    cnpj: string;
    socialReason: string;
    fantasyName: string;
    status: string;
    foundationDate: string;
    email: string;
    phone: string;
    address: {
      street: string;
      district: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  score: {
    value: string;
    class: string;
    riskText: string;
  };
  debts: Array<{
    value: string;
    contract: string;
    origin: string;
    date: string;
  }>;
  protests: Array<{
    value: string;
    date: string;
    origin: string;
    notary: string;
  }>;
  queries: Array<{
    date: string;
    entity: string;
    cityState: string;
  }>;
}

export interface BoaVistaAcertaCpfResult {
  protocol: string;
  totalDebts: number;
  totalProtests: number;
  totalBadChecks: number;
  person: {
    name: string;
    document: string;
    birthDate: string;
    status: string;
    motherName: string;
  };
  score: {
    value: string;
    class: string;
    risk: string;
  };
  alerts: Array<{
    title: string;
    description: string;
  }>;
  phones: Array<{
    areaCode: string;
    number: string;
    type: string;
  }>;
  debts: Array<{
    value: string;
    contract: string;
    origin: string;
    date: string;
  }>;
  protests: Array<any>;
}
