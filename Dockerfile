FROM node:18

WORKDIR /usr/src/app

# Встановлення залежностей
RUN apt-get update && \
    apt-get install -y \
    wget \
    gnupg \
    curl \
    unzip \
    libnss3 \
    libnspr4 \
    libxss1 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdrm2 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libdbus-glib-1-2 \
    fonts-liberation \
    ca-certificates \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Встановлення Google Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
    > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable

# Завантаження та встановлення останньої версії Firefox
RUN wget -O firefox.tar.bz2 "https://ftp.mozilla.org/pub/firefox/releases/127.0/linux-x86_64/en-US/firefox-127.0.tar.bz2" \
    && tar xjf firefox.tar.bz2 \
    && mv firefox /opt/firefox \
    && rm firefox.tar.bz2 \
    && ln -s /opt/firefox/firefox /usr/bin/firefox

# Завантаження та встановлення останньої версії Geckodriver
RUN wget -O geckodriver.tar.gz "https://github.com/mozilla/geckodriver/releases/download/v0.36.0/geckodriver-v0.36.0-linux64.tar.gz" \
    && tar xzf geckodriver.tar.gz \
    && mv geckodriver /usr/local/bin/ \
    && rm geckodriver.tar.gz

# Копіюємо проєкт
COPY package*.json ./
RUN npm install
COPY . .

ENV BROWSER=chrome

CMD ["npm", "run", "test:heap"]