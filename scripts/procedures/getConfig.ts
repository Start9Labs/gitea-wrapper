import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "tor-address": {
    "name": "Tor Address",
    "description": "The Tor address for the main ui.",
    "type": "pointer",
    "subtype": "package",
    "package-id": "gitea",
    "target": "tor-address",
    "interface": "main",
  },
  "local-mode": {
    "name": "Local Mode",
    "description":
      "Toggle this on to change UI links and the SSH domain to the .local domain. Toggle it off to switch back to .onion. This option is convenient if you are using Gitea locally and don't care about remote access.",
    "type": "boolean",
    "default": false,
  },
  "disable-registration": {
    "name": "Disable Registration",
    "description":
      "Prevent new users from signing themselves up. Once registrations are disabled, only an admin can sign up new users. It is recommended that you activate this option after creating your first user, since anyone with your Gitea URL can sign up and create an account, which represents a security risk.",
    "type": "boolean",
    "default": false,
  },
  "email-notifications": {
    "type": "union",
    "name": "Email Notifications",
    "description":
      "Enable this setting to receive email notifications from your Matrix server. Requires inputting SMTP credentials.",
    "tag": {
      "id": "enabled",
      "name": "Enable SMTP Settings",
      "variant-names": {
        "true": "True",
        "false": "False",
      },
    },
    "default": "false",
    "variants": {
      "true": {
        "smtp-settings": {
          "type": "object",
          "name": "SMTP Settings",
          "spec": {
            "smtp-host": {
              "type": "string",
              "name": "Server Address",
              "description":
                "The fully qualified domain name of your SMTP server",
              "nullable": false,
            },
            "smtp-port": {
              "type": "number",
              "name": "Port",
              "description": "The TCP port of your SMTP server",
              "default": 587,
              "integral": true,
              "range": "[1,65535]",
              "nullable": false,
            },
            "from-name": {
              "type": "string",
              "name": "From Name",
              "description":
                "Name to display in the from field when receiving emails from your Gitea server.",
              "nullable": false,
              "placeholder": "test@example.com",
              "pattern": ".*@.*\\..*",
              "pattern-description":
                "Must be a valid email address (e.g. test@example.com) or a name and email address (e.g. Gitea <test@example.com>) ",
            },
            "smtp-user": {
              "type": "string",
              "name": "Username",
              "description": "The username for logging into your SMTP server",
              "nullable": false,
            },
            "smtp-pass": {
              "type": "string",
              "name": "Password",
              "description": "The password for logging into your SMTP server",
              "nullable": true,
              "masked": true,
            },
            "require-transport-security": {
              "type": "boolean",
              "name": "Require Transport Security",
              "description":
                "Require TLS transport security for SMTP. By default, Gitea will connect over plain text, and will then switch to TLS via STARTTLS <strong>if the SMTP server supports it</strong>. If this option is set, Gitea will refuse to connect unless the server supports STARTTLS.",
              "default": false,
            },
          },
        },
      },
      "false": {},
    },
  },
});
