export function toQuantidadeNumerica(value: string | number): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : NaN;
  }

  const normalized = value.trim().replace(/\s/g, '');
  if (!normalized) return NaN;

  // "5.0000" / "38.0000" — casas decimais com zero, não separador de milhar
  if (/^\d+\.0+$/.test(normalized)) {
    return Number(normalized.split('.')[0]);
  }

  if (normalized.includes(',')) {
    return Number(normalized.replace(/\./g, '').replace(',', '.'));
  }

  // Milhar BR: 1.234 ou 12.345.678
  if (/^\d{1,3}(\.\d{3})+$/.test(normalized)) {
    return Number(normalized.replace(/\./g, ''));
  }

  return Number(normalized);
}

export const CASAS_DECIMAIS_QUANTIDADE = 6;

/** Converte texto digitado pelo usuário (formato BR) em quantidade numérica. */
export function parseQuantidadeBR(value: string | number): number {
  const numerica = toQuantidadeNumerica(value);

  if (!Number.isFinite(numerica) || numerica <= 0) return NaN;
  const fator = 10 ** CASAS_DECIMAIS_QUANTIDADE;
  return Math.round(numerica * fator) / fator;
}

export function formatQuantidadeExibicao(value: string | number): string {
  const numerica = toQuantidadeNumerica(value);

  if (!Number.isFinite(numerica)) {
    return String(value);
  }

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: CASAS_DECIMAIS_QUANTIDADE,
    maximumFractionDigits: CASAS_DECIMAIS_QUANTIDADE,
  }).format(numerica);
}

/** @deprecated Use formatQuantidadeExibicao */
export function formatQuantidadeBR(value: string | number): string {
  return formatQuantidadeExibicao(value);
}

export function calcularTotalItem(precoVenda: string | number, quantidade: string | number, total?: string | number): number {
  if (total !== undefined && total !== null && total !== '') {
    const totalNumerico = Number(total);
    if (Number.isFinite(totalNumerico)) return totalNumerico;
  }

  const preco = Number(precoVenda);
  const qty = toQuantidadeNumerica(quantidade);

  if (!Number.isFinite(preco) || !Number.isFinite(qty)) return NaN;
  return Math.round(preco * qty * 100) / 100;
}
