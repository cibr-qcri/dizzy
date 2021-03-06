# Dizzy

Dizzy: A search engine for the visible Dark Web.

[![Build Status](https://jenkins.cibr.qcri.org/job/dizzy-build/badge/icon)](https://jenkins.cibr.qcri.org/job/dizzy-build/)

## Starting

```zsh
# In developement
AMPLITUDE_DEV_API_KEY="REPLACE" docker-compose -f docker-compose.dev.yml up --build --detach

# In production
# Clone the repo in /usr/local directory if not found
cd /usr/local/dizzy && git pull
SMTP_PASSWORD="REPLACE" AMPLITUDE_PROD_API_KEY="REPLACE" JWT_SECRET="REPLACE" docker-compose -f docker-compose.prod.yml up --build --detach
```

## Stopping

```zsh
# In developement
# Add --volumes to remove named vols
docker-compose -f docker-compose.dev.yml down

# In production
# Remove all images for a clean start
docker-compose -f docker-compose.prod.yml down --rmi all
```
