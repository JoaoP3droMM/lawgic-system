export default function applyPhoneMask(value) {
    if (!value) return ""
    
    // 1. Limpa tudo que não for dígito
    value = value.replace(/\D/g, '')

    // 2. Limita a 11 dígitos (DDD + 9 dígitos)
    value = value.slice(0, 11)

    // 3. Aplica a máscara dinamicamente
    if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3')
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2')
    } else {
      value = value.replace(/^(\d*)/, '($1')
    }
    
    return value
}