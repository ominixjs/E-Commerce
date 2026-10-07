export default function FormatCurrencyValue(value, language = "pt-BR", currency = "BRL") {
    return (value / 100).toLocaleString(language, {
        style: "currency",
        currency,
    });
}
