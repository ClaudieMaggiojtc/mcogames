# 🎮 MCO Games

App mobile para loja de jogos e contas digitais para PS4 e PS5.  
Desenvolvido com **React Native + Expo**.

---

## 📱 Como Rodar o App

### Pré-requisitos
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go no celular (Android/iOS) — [baixar aqui](https://expo.dev/go)

### Passos
```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npx expo start

# 3. Escaneie o QR Code com o Expo Go no celular
```

---

## 🗂️ Estrutura de Pastas

```
mcogames/
├── App.js                          ← Ponto de entrada do app
├── app.json                        ← Configurações do Expo
├── package.json                    ← Dependências
├── assets/                         ← Ícones e splash screen
└── src/
    ├── data/
    │   └── games.js                ← ⭐ ARQUIVO PRINCIPAL DE ATUALIZAÇÃO
    ├── screens/
    │   ├── HomeScreen.js           ← Tela inicial
    │   ├── CatalogScreen.js        ← Catálogo com busca e filtros
    │   ├── GameDetailScreen.js     ← Detalhe do jogo
    │   └── CartScreen.js           ← Carrinho de compras
    ├── components/
    │   ├── GameCard.js             ← Card de jogo (grade)
    │   ├── Carousel.js             ← Carrossel de lançamentos
    │   ├── PromoSection.js         ← Seção de promoções
    │   ├── Header.js               ← Cabeçalho com carrinho
    │   └── Badge.js                ← Badge de plataforma/status
    ├── navigation/
    │   └── AppNavigator.js         ← Navegação com abas
    ├── context/
    │   └── CartContext.js          ← Estado global do carrinho
    └── theme/
        └── colors.js              ← Paleta de cores
```

---

## ✏️ Como Atualizar o Catálogo

> ⭐ **Todo o catálogo fica em um único arquivo: `src/data/games.js`**

### Adicionar um novo jogo
Abra `src/data/games.js` e copie e cole um bloco dentro do array `games`:

```js
{
  id: '9',                          // ID único (número diferente dos existentes)
  title: 'Nome do Jogo',
  platform: 'PS5',                  // 'PS4', 'PS5' ou 'PS4/PS5'
  price: 199.90,                    // Preço atual
  originalPrice: 299.90,            // Preço original (null se não tiver promoção)
  cover: 'https://url-da-imagem.jpg', // URL da imagem da capa
  description: 'Descrição do jogo aqui.',
  language: 'Português',            // 'Português', 'Inglês', 'Multilíngue'
  isNew: true,                      // true = aparece no carrossel de lançamentos
  isPromo: true,                    // true = aparece nas promoções em destaque
  genre: 'Ação/Aventura',
  type: 'Jogo',                     // 'Jogo', 'Conta' ou 'DLC'
},
```

### Editar um jogo existente
Encontre o jogo pelo `id` ou `title` e altere os campos desejados.

### Remover um jogo
Apague o bloco `{ ... }` correspondente do array.

---

## 📱 Como Mudar o Número do WhatsApp

No topo do arquivo `src/data/games.js`, altere a linha:

```js
export const WHATSAPP_NUMBER = '5511999999999';
```

Coloque seu número no formato internacional **sem** `+` ou espaços.  
Exemplo: `5511987654321` (55 = Brasil, 11 = DDD, + número)

---

## 🖼️ Como Usar Imagens Reais

No campo `cover` de cada jogo, substitua a URL pelo link direto da imagem da capa.

### Opção 1 — URL direta da internet
```js
cover: 'https://www.example.com/spider-man-2-cover.jpg',
```

### Opção 2 — Imagem local no projeto
1. Salve a imagem em `assets/covers/spider-man-2.jpg`
2. No arquivo `games.js`, importe no topo:
```js
import spiderMan2 from '../../assets/covers/spider-man-2.jpg';
```
3. Use no campo cover:
```js
cover: spiderMan2,
```

---

## 🎨 Personalizar Cores

Edite `src/theme/colors.js` para mudar a paleta visual do app:

```js
const colors = {
  background: '#0a0a0f',   // Fundo principal
  card: '#1a1a2e',         // Fundo dos cards
  accent: '#00d4ff',       // Cor de destaque (azul ciano)
  secondary: '#e94560',    // Cor secundária (vermelho)
  // ...
};
```

---

## 🚀 Funcionalidades

- ✅ Carrossel automático de lançamentos (auto-play 3s)
- ✅ Seção de promoções com badge de desconto
- ✅ Grade de jogos em 2 colunas
- ✅ Catálogo com busca e filtros (PS4, PS5, Promoções, etc.)
- ✅ Tela de detalhe com informações completas
- ✅ Carrinho de compras com controle de quantidade
- ✅ Botão "Comprar pelo WhatsApp" com mensagem pré-preenchida
- ✅ Tema 100% dark estilo PlayStation
- ✅ Sem necessidade de backend — tudo em arquivo local

---

## 📦 Tecnologias Utilizadas

| Tecnologia | Uso |
|-----------|-----|
| React Native + Expo | Framework principal |
| React Navigation | Navegação entre telas |
| Expo Linear Gradient | Gradientes nos cards |
| @expo/vector-icons | Ícones Ionicons |
| Context API | Estado do carrinho |
