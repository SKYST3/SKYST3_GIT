# !/bin/bash

ENV_FILE=".env"
if [ ! -f "$ENV_FILE" ]; then
    echo ".env file not found"
    exit 1
fi

export_variables() {
    while IFS='=' read -r key value || [ -n "$key" ]; do
        if [[ "$key" =~ ^#.*$ || -z "$key" ]]; then
            continue
        fi

        key=$(echo "$key" | xargs)
        value=$(echo "$value" | xargs | sed -e 's/^["'\'']//;s/["'\'']$//')

        export "$key=$value"
        echo "successfully exported: $key"
    done < "$ENV_FILE"
}

export_variables
