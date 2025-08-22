# Configuração do Google Sheets - Atualização em Tempo Real

## ✅ Status: Integração Implementada

O sistema agora está configurado para buscar dados diretamente da sua planilha do Google Sheets. Quando você atualizar os dados na planilha, eles aparecerão aqui automaticamente.

## 🔧 Configuração Necessária

Para conectar à planilha real, você precisa apenas de uma API key do Google:

### Passo 1: Criar API Key
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto ou selecione um existente
3. Vá em "APIs e Serviços" > "Biblioteca" 
4. Procure por "Google Sheets API" e habilite
5. Vá em "Credenciais" > "Criar credenciais" > "Chave de API"
6. Copie a API key gerada

### Passo 2: Configurar a API Key
Edite o arquivo `src/hooks/useGoogleSheets.ts` na linha 15:
```typescript
const GOOGLE_API_KEY = 'SUA_API_KEY_AQUI'; // Substitua pela sua API key
```

### Passo 3: Configurar Permissões da Planilha
1. Abra sua planilha do Google Sheets
2. Clique em "Compartilhar" 
3. Mude para "Qualquer pessoa com o link pode visualizar"
4. Ou adicione a API key às permissões

## 📊 Estrutura da Planilha

Sua planilha deve ter uma aba chamada "E-commerce" com estas colunas:

| A (Data) | B (ID) | C (Qtd) | D | E (Valor) | F | G (Cidade) | H (Estado) | I (Total) |
|----------|---------|---------|---|-----------|---|------------|------------|-----------|
| 02/06/2025 | 18991 | 2 | | 16,75 | | São Luís | MA | 180,00 |

## 🔄 Como Funciona

1. **Atualização Automática**: Os dados são buscados toda vez que a página carrega
2. **Botão Atualizar**: Clique no botão "Atualizar" para buscar os dados mais recentes
3. **Fallback**: Se a API não funcionar, mostra dados de demonstração

## 🚀 Após Configurar

Depois de configurar a API key, os dados da sua planilha aparecerão automaticamente. Qualquer mudança que você fizer na planilha será refletida aqui quando atualizar a página ou clicar em "Atualizar".