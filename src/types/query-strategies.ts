
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
