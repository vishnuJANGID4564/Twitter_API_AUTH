import tweepy

# api_key1 = "Xanf9Lc5eC2wwEdMSR4tyRhGt"
# api_secret1 = "JqQqcv2VxXEIP7VihDluqbV2hHWgbZBAsvFqcyAkwWah7J1VGQ"
# bearer_token1 = r"AAAAAAAAAAAAAAAAAAAAAI10vgEAAAAAr8OLxbdLjjE%2BOnjJ66MKbAmK8pY%3DEVpCXTeT7t5y76HL6dCmmUZRiF5iUtXYE87NnIIclqSD1IQlZd"
# access_token1 = "1829150243759464448-4erE2F4WGGnG7OcTBdk1KIyd47SJHT"
# access_token_secret1 = "EwyHiJPcK4Dfmw03ExgRCVB8fVqbYO8ByPuMteyaa0dUC"

# api_key2 = "PrMvcHN2DlJIGxhXLSDOMVpUt"
# api_secret2 = "xjwpLWCaCL1Kh4eWk1Xm7iL3OwWGGf0n6PYmXEYAckL5xPJRMm"
# bearer_token2 = r"AAAAAAAAAAAAAAAAAAAAAFJ1vgEAAAAABmNDuobTLKpl2%2FTLrUY01TRRyX0%3DoUNETvbPL0snLPl6csHkvCX8Ppr5DEc0q8YWXiWFv9kNYiMxW3"
# access_token2 = "1829164403742388229-WnXiBwCPX8OdrP9GUyX4UuYAeOSKyS"
# access_token_secret2 = "BxmX8RrthYOtCUCbfMzBDnBuPpTCneQWfRJA9J7MkdVQK"


user_credentials = [{   "api_key":"Xanf9Lc5eC2wwEdMSR4tyRhGt",
                        "api_secret":"JqQqcv2VxXEIP7VihDluqbV2hHWgbZBAsvFqcyAkwWah7J1VGQ",
                        "bearer_token" : r"AAAAAAAAAAAAAAAAAAAAAI10vgEAAAAAr8OLxbdLjjE%2BOnjJ66MKbAmK8pY%3DEVpCXTeT7t5y76HL6dCmmUZRiF5iUtXYE87NnIIclqSD1IQlZd",
                        "access_token" : "1829150243759464448-4erE2F4WGGnG7OcTBdk1KIyd47SJHT",
                        "access_token_secret":"EwyHiJPcK4Dfmw03ExgRCVB8fVqbYO8ByPuMteyaa0dUC"
                     },
                     {
                        "api_key":"PrMvcHN2DlJIGxhXLSDOMVpUt",
                        "api_secret":"xjwpLWCaCL1Kh4eWk1Xm7iL3OwWGGf0n6PYmXEYAckL5xPJRMm",
                        "bearer_token" : r"AAAAAAAAAAAAAAAAAAAAAFJ1vgEAAAAABmNDuobTLKpl2%2FTLrUY01TRRyX0%3DoUNETvbPL0snLPl6csHkvCX8Ppr5DEc0q8YWXiWFv9kNYiMxW3",
                        "access_token" : "1829164403742388229-WnXiBwCPX8OdrP9GUyX4UuYAeOSKyS",
                        "access_token_secret":"BxmX8RrthYOtCUCbfMzBDnBuPpTCneQWfRJA9J7MkdVQK"
                     }
                     ]

comments = ["thank you so much","Very Insightful"]

for i, cred in enumerate(user_credentials):
    client = tweepy.Client(cred["bearer_token"],
                           cred["api_key"],
                           cred["api_secret"],
                           cred["access_token"],
                           cred["access_token_secret"])
    client.create_tweet(in_reply_to_tweet_id=1829172149128474776, text=comments[i])




