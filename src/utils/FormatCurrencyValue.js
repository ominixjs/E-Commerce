export default function FormatCurrencyValue(value, language = "pt-BR", currency = "BRL") {
    return new Intl.NumberFormat(language, {
        style: "currency",
        currency,
    }).format(value);
}
