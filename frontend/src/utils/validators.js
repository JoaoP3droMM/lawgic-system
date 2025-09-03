// Função para validar o email
export function validateEmail(email) {
    // Regex simples que proíbe espaços, requer '@' e pelo menos um '.' no domínio
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

// Função para validar telefone celular
export function validatePhone(phone) {
    // Regex para celular brasileiro com DDD e hífen
    const regex = /^\(\d{2}\)\s?9\d{4}-\d{4}$/
    return regex.test(phone)
}