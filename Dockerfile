# ---------- build stage ----------
FROM debian:bookworm-slim AS builder

ARG BITCOIN_VERSION=24.0.1

RUN apt-get update && \
    apt-get install -y --no-install-recommends wget ca-certificates tar && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /tmp

RUN wget -q https://bitcoincore.org/bin/bitcoin-core-${BITCOIN_VERSION}/bitcoin-${BITCOIN_VERSION}-x86_64-linux-gnu.tar.gz && \
    tar xzf bitcoin-${BITCOIN_VERSION}-x86_64-linux-gnu.tar.gz

# ---------- runtime stage ----------
FROM gcr.io/distroless/base-debian12

COPY --from=builder /tmp/bitcoin-*/bin/* /usr/local/bin/

# Bitcoin data directory
VOLUME ["/data"]

EXPOSE 8332 8333

ENTRYPOINT ["bitcoind"]
