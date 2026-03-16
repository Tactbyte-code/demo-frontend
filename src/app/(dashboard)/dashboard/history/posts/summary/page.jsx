"use client"

import React, { useState } from 'react'

// ── Static data — replace with API call later ──────────────────────────────
const STATIC_DATA =
{
    "id": "019cf57e-9d15-7673-b686-915159adf163",
    "job_id": "019cec30-e2b3-7141-a84c-db401d9fbffb",
    "query": "I am building an ai based saas startup which uses postgresql, fastapi, google vertex search and various ai providers i want to deploy my production backend to cloud, what are the suggested server configuration for initial beta testing for about 100 users ?",
    "subreddit": "multiple: r/AI_Agents, r/FastAPI, r/Database, r/flask, r/django, r/dataengineering, r/aws, r/Python, r/Supabase, r/node, r/SaaS, r/cursor, r/iOSProgramming, r/ycombinator, r/startups, r/AZURE, r/angelinvestors, r/serverless, r/FlutterDev, r/appwrite, r/microsaas, r/devops, r/ExperiencedDevs, r/googlecloud, r/dotnet, r/Rag, r/golang, r/comfyui, r/mlops, r/LocalLLaMA, r/LangChain, r/Backend, r/webdev, r/docker, r/LLMDevs, r/agentdevelopmentkit, r/Firebase, r/datascience, r/ChatGPTCoding",
    "analyzed_at": "2026-03-16T07:08:29.715832+00:00",
    "executive_summary": "Reddit users strongly recommend using managed cloud services like AWS RDS, GCP Cloud SQL, or Supabase for PostgreSQL, with serverless options such as AWS Lambda, Google Cloud Run, or Render for FastAPI deployments. For a beta with 100 users, a single small instance (e.g., t3.micro) or equivalent serverless setup is considered sufficient, with a focus on cost-effectiveness and scalability. Containerization with Docker is frequently suggested for future growth, and specific provider preferences include AWS for its maturity and serverless capabilities, GCP for its ease of use, and Azure for enterprise integration.",
    "overall_sentiment": "positive",
    "total_signals": 1874,
    "themes": [
        {
            "id": "theme_1",
            "title": "AI SaaS Backend Configuration",
            "quotes": [
                {
                    "id": "n5qsc5d",
                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qsc5d/",
                    "text": "No, that's excessive buzzword soup that extends beyond DS responsibilities. But they're useful domains to be familiar with.",
                    "score": 365,
                    "author": "minimaxir"
                },
                {
                    "id": "n5qs7cg",
                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qs7cg/",
                    "text": "I guess u have to be a data scientist, software engineer, statistician, analyst, and machine learning engineer all in one now. It is what it is gotta hop on the leetcode grind.",
                    "score": 229,
                    "author": "ChubbyFruit"
                },
                {
                    "id": "n5s1nez",
                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s1nez/",
                    "text": "There are several roles in data field, if we focus on DS/ML side these days. A data scientist should ideally be cleaning data, creating and exploring features (feature engineering), training models, and evaluating model. Once the model is ready, it is passed to MLOps team and they are responsible fo",
                    "score": 51,
                    "author": "Hungry_Assistant6753"
                },
                {
                    "id": "n5qtxgq",
                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qtxgq/",
                    "text": "The sad reality is that this is norm. Not exactly \"new\" though - in my experience, companies have always wanted the unicorn data scientists/analysts that can navigate the full data life cycle. It's just that now the number of new tools has exploded.\n\nHowever, you don't need to know every single tech",
                    "score": 44,
                    "author": "hapham92"
                },
                {
                    "id": "n5qu8xv",
                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qu8xv/",
                    "text": "Hmm\n\nDatabases: MongoDB, PostgreSQL, Pinecone, ChromaDB.\n\nSo... does this company use MongoDB, PostgreSQL, Pinecone AND ChromaDB (especially the last two)?  \nOh, and PyTorch, TensorFlow?\n\nOh, and ALL the cloud providers...\n\n  \nYeah, no.\n\nThis looks like an attempt to hit as many keyword searches as ",
                    "score": 44,
                    "author": "lakeland_nz"
                }
            ],
            "sources": [
                {
                    "id": "1mc2zaz",
                    "kind": "post",
                    "score": 362,
                    "author": "CableInevitable6840",
                    "created": "2025-07-29T05:18:53+00:00",
                    "preview": "* Strong knowledge of Machine Learning, Deep Learning, NLP, and LLMs.\n* Experience with Python, PyTorch, TensorFlow.\n* F",
                    "comments": [
                        {
                            "id": "n5qsc5d",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qsc5d/",
                            "body": "No, that's excessive buzzword soup that extends beyond DS responsibilities. But they're useful domains to be familiar with.",
                            "depth": 0,
                            "score": 365,
                            "author": "minimaxir",
                            "replies": [
                                {
                                    "id": "n5rtcdr",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rtcdr/",
                                    "body": "What are DS responsibilities in your view?",
                                    "depth": 1,
                                    "score": 24,
                                    "author": "incongruous_narrator",
                                    "replies": [
                                        {
                                            "id": "n5s1nez",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s1nez/",
                                            "body": "There are several roles in data field, if we focus on DS/ML side these days. A data scientist should ideally be cleaning data, creating and exploring features (feature engineering), training models, and evaluating model. Once the model is ready, it is passed to MLOps team and they are responsible for operationalising the model such as creating endpoints, monitoring for drift, and retraining if required.",
                                            "depth": 2,
                                            "score": 51,
                                            "author": "Hungry_Assistant6753",
                                            "replies": [
                                                {
                                                    "id": "n5s7c2w",
                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s7c2w/",
                                                    "body": "This is absolutely not the case anywhere I have worked. It’s always been much more end to end",
                                                    "depth": 3,
                                                    "score": 41,
                                                    "author": "[deleted]",
                                                    "replies": [
                                                        {
                                                            "id": "n5s97ak",
                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s97ak/",
                                                            "body": "That is probably the ideal state. Data Science feels like it is 20 years behind software engineering in terms of maturity.",
                                                            "depth": 4,
                                                            "score": 14,
                                                            "author": "ottovonbizmarkie",
                                                            "replies": [
                                                                {
                                                                    "id": "n5sg8f3",
                                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5sg8f3/",
                                                                    "body": "Isn’t that kinda because… it is?",
                                                                    "depth": 5,
                                                                    "score": 13,
                                                                    "author": "teetaps",
                                                                    "replies": [
                                                                        {
                                                                            "id": "n5sjpxs",
                                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5sjpxs/",
                                                                            "body": "I don't know if I can quantify exactly how behind it is, but I can tell you how it feels.",
                                                                            "depth": 6,
                                                                            "score": 7,
                                                                            "author": "ottovonbizmarkie",
                                                                            "replies": [
                                                                                {
                                                                                    "id": "n5uwt3d",
                                                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5uwt3d/",
                                                                                    "body": "This man is a true data scientist. You walk the walk.",
                                                                                    "depth": 7,
                                                                                    "score": 6,
                                                                                    "author": "xFblthpx",
                                                                                    "replies": [],
                                                                                    "created_utc": "2025-07-29T20:27:36+00:00"
                                                                                }
                                                                            ],
                                                                            "created_utc": "2025-07-29T13:48:53+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2025-07-29T13:30:20+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2025-07-29T12:51:03+00:00"
                                                        },
                                                        {
                                                            "id": "n63eyjj",
                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n63eyjj/",
                                                            "body": "Isn’t this mainly due to the size of the company? And end-to-end DS or full-stack DS would operate as a data engineer, DS, and MLE in smaller companies/startups that don’t have the budget for multiple positions. A larger firm would have the resources to hire data engineers, DSs, and MLEs.",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "Few-Original463",
                                                            "replies": [],
                                                            "created_utc": "2025-07-31T02:22:53+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-07-29T12:40:04+00:00"
                                                },
                                                {
                                                    "id": "n5sa9ov",
                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5sa9ov/",
                                                    "body": "This is a very rudimentary level for one area but sure.",
                                                    "depth": 3,
                                                    "score": 3,
                                                    "author": "Artistic-Comb-5932",
                                                    "replies": [],
                                                    "created_utc": "2025-07-29T12:57:11+00:00"
                                                },
                                                {
                                                    "id": "n7d07cm",
                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n7d07cm/",
                                                    "body": "This sounds a lot like a Machine Learning Engineer. Is there any difference between a Data Scientist and ML engineer then?",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "incongruous_narrator",
                                                    "replies": [],
                                                    "created_utc": "2025-08-07T04:21:41+00:00"
                                                },
                                                {
                                                    "id": "n5wg9dy",
                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5wg9dy/",
                                                    "body": "Bro who are yall working for, Raytheon? Sounding like a goddamn wizard",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "Ok-Freedom-5627",
                                                    "replies": [
                                                        {
                                                            "id": "n5wr14h",
                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5wr14h/",
                                                            "body": "hahaha! I was just trying to draw clear boundaries. I know things are different in real life. As a matter of fact, I am a DS who does MLOps, operations, and talks to the customer in a 5-person company.",
                                                            "depth": 4,
                                                            "score": 3,
                                                            "author": "Hungry_Assistant6753",
                                                            "replies": [],
                                                            "created_utc": "2025-07-30T02:22:58+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-07-30T01:19:58+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-07-29T12:04:35+00:00"
                                        },
                                        {
                                            "id": "n5xqslf",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5xqslf/",
                                            "body": "Move data from a to b",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Maximum_Trainer9781",
                                            "replies": [],
                                            "created_utc": "2025-07-30T06:55:22+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T11:05:22+00:00"
                                },
                                {
                                    "id": "n5s3psk",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s3psk/",
                                    "body": "Yes, but it'll be very useful to know, and there are expectations for some roles to handle end to end development which would involve DB management/ML Ops especially in smaller teams.",
                                    "depth": 1,
                                    "score": 5,
                                    "author": "Pvt_Twinkietoes",
                                    "replies": [],
                                    "created_utc": "2025-07-29T12:17:49+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T05:25:20+00:00"
                        },
                        {
                            "id": "n5qs7cg",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qs7cg/",
                            "body": "I guess u have to be a data scientist, software engineer, statistician, analyst, and machine learning engineer all in one now. It is what it is gotta hop on the leetcode grind.",
                            "depth": 0,
                            "score": 229,
                            "author": "ChubbyFruit",
                            "replies": [
                                {
                                    "id": "n5qt7tn",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qt7tn/",
                                    "body": "I’m not sure why DS are paid lesser than SWE.",
                                    "depth": 1,
                                    "score": 43,
                                    "author": "zsrt13",
                                    "replies": [
                                        {
                                            "id": "n5qv0m4",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qv0m4/",
                                            "body": "I don’t know about that at most companies outside of faang your standard data scientist either makes the same as a swe or 10k to 20k more then a swe. At the company I’m interning at rn they start swe’s between 80k-90k and data scientist seem to start at 100k-110k. Most of them as far as I’m aware r doing more traditional data science work, mixed with some ml and a bit of analytics.",
                                            "depth": 2,
                                            "score": 28,
                                            "author": "ChubbyFruit",
                                            "replies": [
                                                {
                                                    "id": "n5qzgki",
                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qzgki/",
                                                    "body": "But don’t you need PhD for DS?",
                                                    "depth": 3,
                                                    "score": 6,
                                                    "author": "ManagementMedical138",
                                                    "replies": [
                                                        {
                                                            "id": "n5qzwjr",
                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qzwjr/",
                                                            "body": "I mean if u wanna get into the bleeding edge data science/ai stuff being done at faang and quant yes. But I think most of us want to do statistics, product analytics and some ml sprinkled in there. Where a masters would suffice.",
                                                            "depth": 4,
                                                            "score": 12,
                                                            "author": "ChubbyFruit",
                                                            "replies": [],
                                                            "created_utc": "2025-07-29T06:32:32+00:00"
                                                        },
                                                        {
                                                            "id": "n5t4r36",
                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5t4r36/",
                                                            "body": "I have a BS in geophysics and I work as a DS at a biotech company. I can just code and do stats better than most of the other scientists who specialize in microbiology and genetics. \n\nI have no idea what all the gene sequence stuff means and they have no idea how to handle a very large data table or do more complex statistics.",
                                                            "depth": 4,
                                                            "score": 7,
                                                            "author": "big_data_mike",
                                                            "replies": [],
                                                            "created_utc": "2025-07-29T15:30:39+00:00"
                                                        },
                                                        {
                                                            "id": "n5vj2oe",
                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5vj2oe/",
                                                            "body": "Nope. Only for research roles.",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "CanYouPleaseChill",
                                                            "replies": [],
                                                            "created_utc": "2025-07-29T22:16:15+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-07-29T06:28:30+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-07-29T05:48:28+00:00"
                                        },
                                        {
                                            "id": "n5quh1a",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5quh1a/",
                                            "body": "that depends on company and what you consider a data scientist though no? ai researchers are making 600k TC out of phd rn. And a lot of companies pay your run of the mill DS more than their SWEs. FAANGs tend to pay SWEs more, yes, but the pay discrepancy isnt that big. the gap is also significantly less the more experienced you are",
                                            "depth": 2,
                                            "score": 8,
                                            "author": "citoboolin",
                                            "replies": [],
                                            "created_utc": "2025-07-29T05:43:40+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T05:32:52+00:00"
                                },
                                {
                                    "id": "n5xcahr",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5xcahr/",
                                    "body": "I’ll say it:\n\nLeetcode is way easier than the full-stack DS studying.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "qc1324",
                                    "replies": [
                                        {
                                            "id": "n5xfrql",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5xfrql/",
                                            "body": "100% agree it’s crazy that DS interviews r as inconsistent as they r across industries",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "ChubbyFruit",
                                            "replies": [],
                                            "created_utc": "2025-07-30T05:16:37+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-30T04:48:19+00:00"
                                },
                                {
                                    "id": "n5r400w",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r400w/",
                                    "body": "Never grind leetcode bruh. You'll only be limited to DSA only then. Based on my experience I'm telling you this",
                                    "depth": 1,
                                    "score": -6,
                                    "author": "[deleted]",
                                    "replies": [
                                        {
                                            "id": "n5r4w5u",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r4w5u/",
                                            "body": "Honestly, I meant the grinding LeetCode portion more as a joke, but I disagree with u to an extent. But if u ever wanna work as a data scientist at faang ur gonna need to LeetCode a ok amount.",
                                            "depth": 2,
                                            "score": 8,
                                            "author": "ChubbyFruit",
                                            "replies": [
                                                {
                                                    "id": "n5ujt3c",
                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5ujt3c/",
                                                    "body": "Why is this the case? LeetCode and Data Science are such different skills. In what practical ways does a data scientist use LeetCode style code on a normal day? I'm asking because I'm just starting out and doing LeetCode style problems feels like a phenomenal waste of time that doesn't actually help my skills progress.",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "cogito_ergo_yum",
                                                    "replies": [
                                                        {
                                                            "id": "n5upo3e",
                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5upo3e/",
                                                            "body": "I mean, LeetCode, even if it's the easy questions, is a good way to sort out candidates from the thousands who apply to larger companies. Leetcode will most likely not be used by a data scientist or a swe on a normal day, but companies have to find something to use as a filter and leetcode code sort of works.",
                                                            "depth": 4,
                                                            "score": 3,
                                                            "author": "ChubbyFruit",
                                                            "replies": [],
                                                            "created_utc": "2025-07-29T19:53:58+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-07-29T19:25:56+00:00"
                                                },
                                                {
                                                    "id": "n5r50my",
                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r50my/",
                                                    "body": "Yeah you need leetcode at intermediate level at least but not at extreme level",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "[deleted]",
                                                    "replies": [],
                                                    "created_utc": "2025-07-29T07:19:57+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-07-29T07:18:48+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T07:10:31+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T05:24:12+00:00"
                        },
                        {
                            "id": "n5qtxgq",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qtxgq/",
                            "body": "The sad reality is that this is norm. Not exactly \"new\" though - in my experience, companies have always wanted the unicorn data scientists/analysts that can navigate the full data life cycle. It's just that now the number of new tools has exploded.\n\nHowever, you don't need to know every single tech mentioned there - knowing just one or two techs in a category is enough. Make sure to put those tech names somewhere in your CV. \n\nMost of the techs mentioned above are open-sourced and you can learn by yourself, no need to subscribe to anything. And if you are already a data scientist, I'm sure you already have some of these skills, like ML, Python, Pytorch, Hugging Face).\n\nThe only thing that you need an account to use are the cloud platforms. However, GCP offers a generous free tier that should be enough for you to get used to the platform.",
                            "depth": 0,
                            "score": 44,
                            "author": "hapham92",
                            "replies": [
                                {
                                    "id": "n5tslno",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5tslno/",
                                    "body": "Do you think this roadmap https://roadmap.sh/ai-data-scientist right here is good for building foundations?",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "Cybrtronlazr",
                                    "replies": [
                                        {
                                            "id": "n5wcm7n",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5wcm7n/",
                                            "body": "I'm not sure what's your current level. In case you are a beginner find this too intimidating, you can slim it down like this in the beginning:\n\n- Math: Pick one course\n- Statistics: Learn the first three courses.\n- Skip econometrics \n- Coding: Pick the Google Python class. Learn the Algorithms Specialization if you are interested. *Seriously* learn SQL - it's a must.\n- Exploratory Data Analysis: Learn Pandas and Seaborn first\n- Machine Learning: Pick one course\n- Deep Learning: Pick only the course\n- Skip MLOps.\n\nThe goal is to get used to the field as fast as possible. When I say skipping something, it doesn't mean those things are not important at all. We can always come back to learn those things after landing the first DS job. It is very easy to fall into the trap of grinding online courses endlessly without actually applying.",
                                            "depth": 2,
                                            "score": 9,
                                            "author": "hapham92",
                                            "replies": [
                                                {
                                                    "id": "n5we6fz",
                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5we6fz/",
                                                    "body": "Do you think if I learn those topics and build projects in them, its possible to land the internship or job? I am a statistics major at a t10 general university but suck at talking to people, so I probably can't \"nepo\" or connections my way into anything big. \n\nI was thinking of actually working in econometrics (my dream job was quant finance, lol), so I'm probably going to delve into that heavily. It's unfortunate how all my college classes use R instead of Python, though. I'm definitely going to have to brush up on pandas and scikit (I knew some at one point but kind of forgot because I used R in all my classes). \n\nI also do know a lot of the underlying math at a general level, but I don't exactly know how they apply to data science. For example, I know conceptually how to do Lagrange multipliers or optimization, but I don't know where or how it's used in the statistics world yet. I assume it's going to be taught throughout the major, though. Learning some basic MLEs and using linear algebra in my regression analysis course was fun, though. I definitely enjoy the applied mathematics side way more, lol.",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "Cybrtronlazr",
                                                    "replies": [
                                                        {
                                                            "id": "n5wgkjh",
                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5wgkjh/",
                                                            "body": "Honestly no idea. People tell you building personal projects is good to get yourself noticed though, so probably it's useful? For me the only thing that helped me during job interviews recently were my thesis project. Nobody asked about my side projects.\n\nYears ago I got my first data analytics job through internal movement. I joined the company as a market researcher. However, I frequently asked the data team to give me any spare tasks they did not want to do, so I got into good terms with the team members. In the end, when my market research team was disbanded, I joined the data team.\n\nIn other words, I think an internship, or a position adjacent to data analytics may give you a doorway. Don't think too hard about \"talking\" or making connection, just show your genuine interest in the work.",
                                                            "depth": 4,
                                                            "score": 3,
                                                            "author": "hapham92",
                                                            "replies": [
                                                                {
                                                                    "id": "n5wkbe8",
                                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5wkbe8/",
                                                                    "body": "I see. The market has definitely changed greatly then, because right now to even get noticed by AI resume screeners you have to have something crazy and market yourself through projects if you don't have relevant work experience. You can't even get to the interview stage anymore, which was very common even just a decade ago.",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "Cybrtronlazr",
                                                                    "replies": [],
                                                                    "created_utc": "2025-07-30T01:44:00+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2025-07-30T01:21:45+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-07-30T01:08:00+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-07-30T00:59:04+00:00"
                                        },
                                        {
                                            "id": "n5ucjvw",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5ucjvw/",
                                            "body": "yes, that's a good start",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "RecognitionSignal425",
                                            "replies": [],
                                            "created_utc": "2025-07-29T18:51:53+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T17:20:44+00:00"
                                },
                                {
                                    "id": "n5r80xk",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r80xk/",
                                    "body": "Thank you.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T07:49:02+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T05:38:58+00:00"
                        },
                        {
                            "id": "n5qu8xv",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qu8xv/",
                            "body": "Hmm\n\nDatabases: MongoDB, PostgreSQL, Pinecone, ChromaDB.\n\nSo... does this company use MongoDB, PostgreSQL, Pinecone AND ChromaDB (especially the last two)?  \nOh, and PyTorch, TensorFlow?\n\nOh, and ALL the cloud providers...\n\n  \nYeah, no.\n\nThis looks like an attempt to hit as many keyword searches as possible.  Or an agency that has clients using anything.",
                            "depth": 0,
                            "score": 44,
                            "author": "lakeland_nz",
                            "replies": [
                                {
                                    "id": "n5rh17f",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rh17f/",
                                    "body": "The company uses excel and you will be changing colors in a power BI report",
                                    "depth": 1,
                                    "score": 38,
                                    "author": "mndl3_hodlr",
                                    "replies": [
                                        {
                                            "id": "n5tulrr",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5tulrr/",
                                            "body": "Too real",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "Derpy_Snout",
                                            "replies": [],
                                            "created_utc": "2025-07-29T17:29:43+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T09:16:36+00:00"
                                },
                                {
                                    "id": "n5r7vdu",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r7vdu/",
                                    "body": "Ohhh thanks for the insight.",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T07:47:33+00:00"
                                },
                                {
                                    "id": "n5schg6",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5schg6/",
                                    "body": "An agency with clients using different tech stacks is a pretty common situation where this would be an appropriate job description, yeah. \n\nLike, for cloud providers, mlops, and databases, the people on my team pretty much only need to know AWS, mlflow, and Spark. Everything else on the list OP posted is a reasonable (and fairly minimal, tbh) requirement. But HR doesn't make a custom job description for every combination of client/team/project, they maintain one reference job description per functional role and let the recruiter/interviewer sort out the details.",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "wintermute93",
                                    "replies": [],
                                    "created_utc": "2025-07-29T13:09:44+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T05:41:43+00:00"
                        },
                        {
                            "id": "n5qz6ty",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qz6ty/",
                            "body": "As a self employed data scientist who work with several companies, I would say know the essential stuff such as SQL, Python, AWS (or one of the other cloud providers), a little bit of Docker and Fastapi (optional). Obviously you have to know about ML some DL, and stats. \n\nThe most important skill is to be able to pick up new techniques quickly. Need to use MLFLOW? sure read a book or watch a course and apply it. Need to use MongoDB or learn how to run Tensorflow? the client asks to use the Prophet model?   \nwatch a course and apply it.",
                            "depth": 0,
                            "score": 18,
                            "author": "Dror_sim",
                            "replies": [
                                {
                                    "id": "n5r11pn",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r11pn/",
                                    "body": "when u say learn AWS  or cloud \n\nwhat exactly should i learn?",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "Brilliant-Arrival414",
                                    "replies": [
                                        {
                                            "id": "n5r1is0",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r1is0/",
                                            "body": "Learn the most popular one, unless you have a specific demand from work. AWS is a good pick",
                                            "depth": 2,
                                            "score": 5,
                                            "author": "Dror_sim",
                                            "replies": [
                                                {
                                                    "id": "n5s4vfm",
                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s4vfm/",
                                                    "body": "But which part of the cloud provider? Azure for example has a bazillion functionalities. Do I have to learn all and have portfolio projects in all?",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "newquestoin",
                                                    "replies": [
                                                        {
                                                            "id": "n5s71wx",
                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s71wx/",
                                                            "body": "For AWS, there are a few things that are heavily used like Lamda, RDS, EC2,  Route 53, Elastic Load Balancer etc. These are just typical things used for deployment.\n\nEdit:\n\nI think it is more important to understand what you need in deployment.\n\nSo you need storage, compute, DNS, load balancing, backup, failover, security, authentication. And you'll figure out what service you need.",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "Pvt_Twinkietoes",
                                                            "replies": [],
                                                            "created_utc": "2025-07-29T12:38:24+00:00"
                                                        },
                                                        {
                                                            "id": "n5s7oe3",
                                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s7oe3/",
                                                            "body": "EC2, RDS, S3, LAMBDA, sagemaker, also scheduler (I forgot the name). Start with that, and what the guy that replied to you said.",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "Dror_sim",
                                                            "replies": [],
                                                            "created_utc": "2025-07-29T12:42:07+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-07-29T12:25:00+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-07-29T06:47:37+00:00"
                                        },
                                        {
                                            "id": "n5s60qj",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s60qj/",
                                            "body": "I think AWS Solutions architect associate covers most of things you'll need to know to deploy on AWS.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "Pvt_Twinkietoes",
                                            "replies": [],
                                            "created_utc": "2025-07-29T12:32:06+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T06:43:12+00:00"
                                },
                                {
                                    "id": "n5r6hwt",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r6hwt/",
                                    "body": "Thanks, that's insightful.\n\nThat's how I have done at my internships too.. Idk why they list it like that then. Something like preferred qualifications would have made more sense.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T07:34:12+00:00"
                                },
                                {
                                    "id": "n5tzsq0",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5tzsq0/",
                                    "body": "That ***self employed data Scientist*** peaked my interest. I want to be where you’re at in your career. How did you end up being self employed? Did you start your own business or freelance? If the latter, I did you procure your clients? I would appreciate any insight you might offer. Ty",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "rise_n_shine23",
                                    "replies": [],
                                    "created_utc": "2025-07-29T17:52:57+00:00"
                                },
                                {
                                    "id": "n5wpibx",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5wpibx/",
                                    "body": "Prophet 🫠",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "DuxFemina22",
                                    "replies": [
                                        {
                                            "id": "n5x3pep",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5x3pep/",
                                            "body": "This is the first thing that came into my mind ;)",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Dror_sim",
                                            "replies": [],
                                            "created_utc": "2025-07-30T03:45:08+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-30T02:13:53+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T06:26:00+00:00"
                        },
                        {
                            "id": "nbokhj0",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/nbokhj0/",
                            "body": "A lot of job postings list every tool under the sun, but most roles don’t expect you to know them all inside out. Get solid on the core DS/ML skills first, then pick up other tools as you go. For the data engineering side, especially ingestion/ELT, tools like Skyvia or Fivetran can handle the pipelines, so you can focus more on the modeling work.",
                            "depth": 0,
                            "score": 18,
                            "author": "SnooPeanuts273",
                            "replies": [
                                {
                                    "id": "nbt92gz",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/nbt92gz/",
                                    "body": "Yes, sir/ma'am. :D",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-09-01T10:02:29+00:00"
                                }
                            ],
                            "created_utc": "2025-08-31T16:01:14+00:00"
                        },
                        {
                            "id": "n5qt45q",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qt45q/",
                            "body": "What's your experience level vs the postings you're looking at? When hiring experienced people it's more common to have specific technologies you want.\n\nBut for an earlier in your career DS, you job isn't to already know all this stuff. It's to know the foundational stuff (python, ML, DB logic, stats, experiment design) and have to ability to learn the specific technologies you need on the job.\n\nIf a listing has all this stuff, they're not expecting to find candidates who are know all of these things well, because that person doesn't exist. They're basically just throwing keywords at the wall to see what sticks. They could very reasonably be hiring someone to work on AI products and put LangChain in the posting even though they don't use it, because that tells them something about your ability to understand whatever it is they do use.\n\nAlso you mention some MLOps or Data Engineering things which you generally wouldn't expect a data scientist to know more than the basics of.",
                            "depth": 0,
                            "score": 16,
                            "author": "Atmosck",
                            "replies": [
                                {
                                    "id": "n5r847s",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r847s/",
                                    "body": "Yeah I had the same thought. MLOps is a bit too much.",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T07:49:55+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T05:31:59+00:00"
                        },
                        {
                            "id": "n5qvmd7",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qvmd7/",
                            "body": "I don't think it's worth paying for the cloud, database and mlops courses. These skills are best learned on the job. There are a lot of free materials online already.",
                            "depth": 0,
                            "score": 4,
                            "author": "orz-_-orz",
                            "replies": [
                                {
                                    "id": "n5r7k11",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r7k11/",
                                    "body": "But then you need get hired to learn them on the job :'(",
                                    "depth": 1,
                                    "score": 5,
                                    "author": "CableInevitable6840",
                                    "replies": [
                                        {
                                            "id": "n5tdetn",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5tdetn/",
                                            "body": "Yet another Catch 22 ! No wex No job, No job No wex !",
                                            "depth": 2,
                                            "score": 0,
                                            "author": "letsTalkDude",
                                            "replies": [],
                                            "created_utc": "2025-07-29T16:10:54+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T07:44:30+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T05:53:46+00:00"
                        },
                        {
                            "id": "n5qxo6b",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qxo6b/",
                            "body": "When people say learn they mean familiarity, you can be extremely good  at maybe 3-5,  around ok on 5-7, and needing improvement in 8-10. Main point is if i ask you a question on any of these and you can come up with a acceptable answer you are fine. People like to gate keep for no reason at all, it really comes down to how well you comprehend them. Most of the time you will learn some on the job, and some are straight forward once you learn the concept you wont forget it. Don't be afraid to apply anyway.",
                            "depth": 0,
                            "score": 5,
                            "author": "Select-Ad-1497",
                            "replies": [
                                {
                                    "id": "n5r6l71",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r6l71/",
                                    "body": "I so agree, thanks for this. I thought I am expected to be some kinda magician lol.",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "CableInevitable6840",
                                    "replies": [
                                        {
                                            "id": "n5te4ym",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5te4ym/",
                                            "body": "u/Select-Ad-1497  has nailed it! u/CableInevitable6840  follow his advice.",
                                            "depth": 2,
                                            "score": 3,
                                            "author": "letsTalkDude",
                                            "replies": [
                                                {
                                                    "id": "n5tjfb6",
                                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5tjfb6/",
                                                    "body": "Aye aye captain!",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "CableInevitable6840",
                                                    "replies": [],
                                                    "created_utc": "2025-07-29T16:39:00+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-07-29T16:14:19+00:00"
                                        },
                                        {
                                            "id": "n5rdq9i",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rdq9i/",
                                            "body": "I've felt like that in the past too. you're welcome!",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "Select-Ad-1497",
                                            "replies": [],
                                            "created_utc": "2025-07-29T08:44:21+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T07:35:05+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T06:12:02+00:00"
                        },
                        {
                            "id": "n5r9y5v",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r9y5v/",
                            "body": "No, you dont need to learn all these skills. Given these fields are also so deep today, it is somewhat impossible to be good at all of them. \nIf you see job postings like this, it tells you a lot about the company...\nJust do what you like and be good at it. Moreover, if you picked up Oracle sql it's very credible if you say that you will pick up tsql in no time and so on. \nAlso a lot of stuff is typically internship/ on the job learning like MLflow or git.",
                            "depth": 0,
                            "score": 4,
                            "author": "Ok_Kitchen_8811",
                            "replies": [
                                {
                                    "id": "n5rbt4e",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rbt4e/",
                                    "body": "Thank you so much.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T08:25:33+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T08:07:20+00:00"
                        },
                        {
                            "id": "n5qvovd",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qvovd/",
                            "body": "While having multiple tools in each category is maybe overkill (like all the cloud providers) this listing is roughly the set of tools you need to build like a basic chatbot. I don't see how it's overkill.\n\nI'd never expect a fresh grad to be exposed to all of these, but this is no longer a new field and many people are 5-10 years working as a data scientist. At that point you've hopefully seen tools in all these categories or more.",
                            "depth": 0,
                            "score": 8,
                            "author": "faulerauslaender",
                            "replies": [
                                {
                                    "id": "n5r7i63",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r7i63/",
                                    "body": "Ohhh...so will only these suffice:\n\n* Strong knowledge of Machine Learning, Deep Learning, NLP, and LLMs.\n* Experience with Python, PyTorch, TensorFlow.\n* Familiarity with Generative AI frameworks: Hugging Face, LangChain, MLFlow, LangGraph, LangFlow.\n* Cloud platforms: AWS \n* Databases: PostgreSQL\n* MLOps tools: Docker\n\nCome on, whatever is listed is too much. :'(",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "CableInevitable6840",
                                    "replies": [
                                        {
                                            "id": "n5rc6ll",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rc6ll/",
                                            "body": "No idea. I didn't write the ad. But I think it's pretty clear from the listed tools what kind of profile they're looking for. Specifically: a person that can build cloud-based LLM applications and maybe also has some generalist experience.",
                                            "depth": 2,
                                            "score": 4,
                                            "author": "faulerauslaender",
                                            "replies": [],
                                            "created_utc": "2025-07-29T08:29:12+00:00"
                                        },
                                        {
                                            "id": "n5s5e9h",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s5e9h/",
                                            "body": "In all honestly it isn't much, I'm already doing most of those. It depends on what you want to do.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "Pvt_Twinkietoes",
                                            "replies": [],
                                            "created_utc": "2025-07-29T12:28:13+00:00"
                                        },
                                        {
                                            "id": "n5sm50l",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5sm50l/",
                                            "body": "Is this for an entry level position?\n\nIf this is for a senior data scientist position, then it's honestly a fairly reasonable list. Except for the multiple tools in each category, for example requiring experience with PyTorch AND Tensorflow just doesn't make much sense.\n\nSenior DS positions require experience and knowledge.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Ty4Readin",
                                            "replies": [],
                                            "created_utc": "2025-07-29T14:01:12+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T07:44:01+00:00"
                                },
                                {
                                    "id": "n5vkwqb",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5vkwqb/",
                                    "body": "Basic chatbots add little to no value in the majority of cases. Not even worth the hassle. A simple linear or logistic regression model applied to the right problem is more valuable.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CanYouPleaseChill",
                                    "replies": [],
                                    "created_utc": "2025-07-29T22:25:54+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T05:54:22+00:00"
                        },
                        {
                            "id": "n5r0ipx",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r0ipx/",
                            "body": "Job postings are developed by recruiters with little to no knowledge of the job they are screening for. It science this shows up as recruiters asking chemists microbio lab questions, in engineering mechanical and industrial will be flipped, and in tech it shows up as lists of buzzwords and software that span a dozen roles",
                            "depth": 0,
                            "score": 3,
                            "author": "Snarky_Quip",
                            "replies": [
                                {
                                    "id": "n5r3pcu",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r3pcu/",
                                    "body": "Then how is one supposed to crack the screening process? Help me?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [
                                        {
                                            "id": "n61d9sb",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n61d9sb/",
                                            "body": "LinkedIn Networking. Get your contacts up past 500. Add anyone, add people you went to school with, professors, people who worked at your job that you never spoke to. Target people at a company you are interested in and spray and pray messages to people there asking to interview them about their role and career. Get recommendations from them. It feels so awkward but I promise people expect it. Getting through any screening from online applications os virtually impossible. You have to use networking",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Snarky_Quip",
                                            "replies": [],
                                            "created_utc": "2025-07-30T19:50:34+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T07:07:44+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T06:38:17+00:00"
                        },
                        {
                            "id": "n5so0p2",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5so0p2/",
                            "body": "… or maybe more or less (at the same time), depending on your actual work and focus.\n\nOn the top what you have listed, I also use the following methods in my daily work:\n\n- Bayesian inference\n- Time series prediction\n- Counterfactual analysis\n- Causal inference\n- Survival analysis\n- etc. etc.\n\n(Yes, these are partially “Machine Learning”, too.)\n\nAnd on the top, I frequently develop prototypes and dashboards, mostly with Plotly Dash and Streamlit.\n\nAnd also, as our primary products are backed by ML pipelines, I spend quite some time with writing high performance pipelines (where actually polars is my current best friend).\n\nAnd I also develop FastAPI, Django etc. backends.\n\nHowever, on the other hand:\n\n- Our company uses PyTorch, and therefore I haven’t seen any TensofFlow for years\n\n- We are deploying our solutions to OpenShift/ Kubernetes and Google Cloud GKE/Vertex AI, but I keep my hands away from deployment on purpose – one has to prioritize, and I rather focus on statistical modeling and business problem solving, than on deployment. So I let my colleagues do Helm charts, Gitlab/CI configurations etc.\n\n- I can do a little frontend, but we have a dedicated, professional React & friends front-end team. Again: focus.",
                            "depth": 0,
                            "score": 3,
                            "author": "DataPastor",
                            "replies": [
                                {
                                    "id": "n5w07sx",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5w07sx/",
                                    "body": "Your work is very interesting. Are you DS or MLE?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "FlyingSpurious",
                                    "replies": [
                                        {
                                            "id": "n5x8u30",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5x8u30/",
                                            "body": "Here in Europe, we have no clear distinction between these two roles – the actual job varies at each company. In our company, data scientists (like me) are doing end-to-end development, so we partially do classical MLE tasks, too – but we have a dedicated team for solution deployment (gitlab/CI, K8s, postgres configuration etc.).",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "DataPastor",
                                            "replies": [],
                                            "created_utc": "2025-07-30T04:21:45+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T23:48:13+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T14:10:37+00:00"
                        },
                        {
                            "id": "n5r52r6",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r52r6/",
                            "body": "They're not hiring a Data Scientist, they are building an entire Analytics Dept with a single employee.",
                            "depth": 0,
                            "score": 4,
                            "author": "Andre1661",
                            "replies": [
                                {
                                    "id": "n5r5wv8",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r5wv8/",
                                    "body": " I ideally want to say it out loud too but then Idk if it's me lacking skills or them asking for too much.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T07:28:30+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T07:20:31+00:00"
                        },
                        {
                            "id": "n5r76h8",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r76h8/",
                            "body": "You have to have multiple on each bullet to be an “ideal candidate.”\n\nHow likely is it they actually have three cloud platforms? It’s likely AWS with some sprinkled in Azure and they threw GCP on there since it’s fairly similar. \n\nThey’re describing what they’re doing and also listing similar things to widen the net. If a single person is covering all of these bullets I doubt they have expertise in any of them, but if they get one candidate super strong in the bottom 3 bullets and another super strong in the top 3 bullets that makes for a great team.",
                            "depth": 0,
                            "score": 2,
                            "author": "AngeliqueRuss",
                            "replies": [
                                {
                                    "id": "n5r8cjo",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r8cjo/",
                                    "body": "I am the latter one lol.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T07:52:08+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T07:40:52+00:00"
                        },
                        {
                            "id": "n5rc1q4",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rc1q4/",
                            "body": "I recently interviewed at one of the company and they asked me to build dynamic ML pipelines in objected oriented fashion, asking to make use static methods. I don’t even know the hell it is. Yes, in today’s market DS needs to learn everything, from CS to ML/AI. The level of depth and breath changes from company to company but currently everyone wants very deep experience in coding, machine learning and AI.",
                            "depth": 0,
                            "score": 2,
                            "author": "Optimal_Bother7169",
                            "replies": [
                                {
                                    "id": "n5rf8cf",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rf8cf/",
                                    "body": "Well then vibe coding should be allowed during interviews lol or they should be take-home assignments, no?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T08:58:58+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T08:27:53+00:00"
                        },
                        {
                            "id": "n5rccyt",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rccyt/",
                            "body": "Unfortunately there is no industry-standardized definition of a Data Scientist role. When the employer doesn't know exactly who they need, they just stamp the title \"Data Scientist\" on any combination of requirements.\n\nThat said, you wouldn't find all these requirements under the title Data Scientist in big Tech, like Meta or Amazon. These are typically expectations from an Applied Scientist role or more likely an MLE role in an NLP-specific domain.",
                            "depth": 0,
                            "score": 2,
                            "author": "DieselZRebel",
                            "replies": [
                                {
                                    "id": "n5rfvtv",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rfvtv/",
                                    "body": "Yeah the big tech is generally more specific.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T09:05:20+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T08:30:56+00:00"
                        },
                        {
                            "id": "n5rcxe7",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rcxe7/",
                            "body": "Yes, depends, depends, absolutely, 300% but those are weird technologies to list, depends.",
                            "depth": 0,
                            "score": 2,
                            "author": "S-Kenset",
                            "replies": [
                                {
                                    "id": "n5rftcl",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rftcl/",
                                    "body": "Cries in pain out of confusion again. :'(",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [
                                        {
                                            "id": "n5t2c7v",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5t2c7v/",
                                            "body": "I would say if you can obliterate sql code, just basic mysql or postgresql, can live code python comfortably, and have experience with cloud through your work, you're good. the rest is mostly conceptual that you need to be ready for. and conceptually the sky is the limit.\n\nI shifted off from data science to junior data leadership (lead and manager roles) so i'm no longer burdened with too much mlops stuff. I suggest you do the same.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "S-Kenset",
                                            "replies": [],
                                            "created_utc": "2025-07-29T15:19:17+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T09:04:41+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T08:36:32+00:00"
                        },
                        {
                            "id": "n5regri",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5regri/",
                            "body": "Depends on seniority and the level of knowledge they're really asking for.\n\nBroadly you have data science and MLOps/engineering skills here. The first three bullets are DS, the second are more engineering.\n\nThe data science I'd expect juniors to start with a decent knowledge of bits of it and grow until they either cover all bases or a few very deeply.\n\nThe engineering I'd expect a senior to have a grasp of. Not necessarily be a kubernetes or AWS expert but able to do simple tasks with those tools or have conversations with engineering colleagues for planning purposes.",
                            "depth": 0,
                            "score": 2,
                            "author": "DuckSaxaphone",
                            "replies": [
                                {
                                    "id": "n5rfdd1",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rfdd1/",
                                    "body": "Noted.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T09:00:19+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T08:51:31+00:00"
                        },
                        {
                            "id": "n6utw2u",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n6utw2u/",
                            "body": "Nope it's not like that's",
                            "depth": 0,
                            "score": 2,
                            "author": "Potential_Pound2828",
                            "replies": [],
                            "created_utc": "2025-08-04T11:57:32+00:00"
                        },
                        {
                            "id": "n5qs941",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qs941/",
                            "body": "RemindMe! 1 Day",
                            "depth": 0,
                            "score": 1,
                            "author": "Correct_Scene143",
                            "replies": [
                                {
                                    "id": "n5qscyf",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qscyf/",
                                    "body": "I will be messaging you in 1 day on [**2025-07-30 05:24:37 UTC**](http://www.wolframalpha.com/input/?i=2025-07-30%2005:24:37%20UTC%20To%20Local%20Time) to remind you of [**this link**](https://www.reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qs941/?context=3)\n\n[**CLICK THIS LINK**](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=Reminder&message=%5Bhttps%3A%2F%2Fwww.reddit.com%2Fr%2Fdatascience%2Fcomments%2F1mc2zaz%2Fdoes_a_data_scientist_need_to_learn_all_these%2Fn5qs941%2F%5D%0A%0ARemindMe%21%202025-07-30%2005%3A24%3A37%20UTC) to send a PM to also be reminded and to reduce spam.\n\n^(Parent commenter can ) [^(delete this message to hide from others.)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=Delete%20Comment&message=Delete%21%201mc2zaz)\n\n*****\n\n|[^(Info)](https://www.reddit.com/r/RemindMeBot/comments/e1bko7/remindmebot_info_v21/)|[^(Custom)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=Reminder&message=%5BLink%20or%20message%20inside%20square%20brackets%5D%0A%0ARemindMe%21%20Time%20period%20here)|[^(Your Reminders)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=List%20Of%20Reminders&message=MyReminders%21)|[^(Feedback)](https://www.reddit.com/message/compose/?to=Watchful1&subject=RemindMeBot%20Feedback)|\n|-|-|-|-|",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "RemindMeBot",
                                    "replies": [],
                                    "created_utc": "2025-07-29T05:25:30+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T05:24:37+00:00"
                        },
                        {
                            "id": "n5qwfjr",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5qwfjr/",
                            "body": "Can anyone tell me how many of them a beginner needs to be proficient in?? I lack guidance and proper info",
                            "depth": 0,
                            "score": 1,
                            "author": "GroundbreakingWar279",
                            "replies": [
                                {
                                    "id": "n5r6mdn",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r6mdn/",
                                    "body": "I asked for similar reasons.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T07:35:24+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T06:00:54+00:00"
                        },
                        {
                            "id": "n5r0qa6",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r0qa6/",
                            "body": "I approached a big4 partner who was hiring and he straight away asked me if I have full stack data science experience. Turned me down for not having worked on react, js.",
                            "depth": 0,
                            "score": 1,
                            "author": "itsallkk",
                            "replies": [
                                {
                                    "id": "n5r3lpf",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r3lpf/",
                                    "body": "This is exactly what I am talking about.. I mean what kinda creature with 20 hands and 10 brains are they expecting to turn up and solve all their problems -\\_-",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-29T07:06:46+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T06:40:13+00:00"
                        },
                        {
                            "id": "n5r9y2b",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5r9y2b/",
                            "body": "I completely understand where you're coming from job descriptions these days often seem to expect one person to do the work of an entire team. The reality is, you don't need to master everything all at once. Having a solid understanding of Python, core machine learning (ML) and deep learning (DL) concepts, along with experience in one cloud platform, is an excellent starting point. \n\nMany companies list every possible tool they might use, but in practice, teams are usually more than fine if you have a strong grasp of the fundamentals and a willingness to learn. Choose a few tools that align with your interests perhaps Hugging Face if you're interested in natural language processing (NLP) or LangChain if you're exploring generative AI. You can expand your knowledge over time with tools like MLflow and Docker, but there's no need to rush to check every box immediately.\n\nIt's more valuable to have depth in one area along with a reasonable breadth of knowledge than to be a jack-of-all-trades without any hands-on experience.",
                            "depth": 0,
                            "score": 1,
                            "author": "Anjalikumarsonkar",
                            "replies": [],
                            "created_utc": "2025-07-29T08:07:18+00:00"
                        },
                        {
                            "id": "n5rcwhm",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rcwhm/",
                            "body": "How many years of experiences are these jobs asking for? \n\nI'm entering my 7th year in the field and am pretty confident in most of these (GenAI excluded since it has never been relevant to any work I do but I am confident that I have the knowledge to fill in whatever missing gaps I have). At some point you just learn principles over technology. I've never heard of ChromaDB but quick search tells me it just yet another vector database and looking at some code samples, it isn't really anything that groundbreaking. \n\nI wouldn't expect in depth knowledge of everything but anyone with 5-10 years experience at this point should be comfortable with most of the stuff on the list.",
                            "depth": 0,
                            "score": 1,
                            "author": "mereswift",
                            "replies": [
                                {
                                    "id": "n5rf30k",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rf30k/",
                                    "body": "I think 3-5\n\n\"At some point you just learn principles over technology.\"\n\nI feel the same. I have interned nationally and internationally, they never made knowing everything beforehand as prerequisite, something basic was necessary and that definitely made sense.\n\nOh, with 5-10, yeah maybe if they have experience of multiple domains but then I expect them to have some niche too.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [
                                        {
                                            "id": "n5rjo8n",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rjo8n/",
                                            "body": "This is a little much for 3-5 years IMHO. I'd expect someone with that experience to have touched many of those but still growing and should be working with a senior on them.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "mereswift",
                                            "replies": [],
                                            "created_utc": "2025-07-29T09:41:53+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-29T08:57:32+00:00"
                                }
                            ],
                            "created_utc": "2025-07-29T08:36:17+00:00"
                        },
                        {
                            "id": "n5rgjbc",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rgjbc/",
                            "body": "Ideally, a data scientist should be tool-agnostic but also have some experience with major tools. However, companies mistakenly believe that the more tools you know, the better you are. They also overestimate how long it takes to learn a new tool if you are already familiar with a similar one. For instance, I don't know all cloud providers, but I know one well and can apply that knowledge to others. The names change, but the technologies are almost the same. Unfortunately, recruiters don't always understand this. I explain to them that coffee machines work the same way, regardless of brand. The only differences are the names, colors, and positions of the buttons.",
                            "depth": 0,
                            "score": 1,
                            "author": "reddit_wisd0m",
                            "replies": [],
                            "created_utc": "2025-07-29T09:11:41+00:00"
                        },
                        {
                            "id": "n5rjhhj",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rjhhj/",
                            "body": "The AI slopping skill we can ignore. Whatever \n\nOther than that, those are things that you might not know, but with experience, you should be able to catch up fairly quickly. Mongo is js, neo4j is sql with ascii art,  ML and friends is basically linear algebra with different seasonings, and so on.\n\nObs it is still a red flag that jobs just dump the word salad without knowing. In my experience, I have done the same when applying for the job. As long as I get an interview, I can make them understand that I can get onboarded on many technologies depending on the scope of the peoject",
                            "depth": 0,
                            "score": 1,
                            "author": "alekosbiofilos",
                            "replies": [],
                            "created_utc": "2025-07-29T09:40:06+00:00"
                        },
                        {
                            "id": "n5rkgvv",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rkgvv/",
                            "body": "Looks like something a Senior ML/AI Engineer would ideally know, at least in my company.\n\n\nIn reality though noone is an expert in AWS, LLMs, CV, and classical ML. You gotta specialise. But at the same time you would probably have some experience with all of them. ",
                            "depth": 0,
                            "score": 1,
                            "author": "[deleted]",
                            "replies": [],
                            "created_utc": "2025-07-29T09:49:21+00:00"
                        },
                        {
                            "id": "n5rmqdl",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rmqdl/",
                            "body": "The more skills you have, the easier you get a job.\nYou are also required to have knowledge of business, marketing, and social surveillance.",
                            "depth": 0,
                            "score": 1,
                            "author": "AdAdditional1820",
                            "replies": [],
                            "created_utc": "2025-07-29T10:10:07+00:00"
                        },
                        {
                            "id": "n5rz8eg",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rz8eg/",
                            "body": "I use one or two of these in each bullets at work everyday",
                            "depth": 0,
                            "score": 1,
                            "author": "Thanh1211",
                            "replies": [],
                            "created_utc": "2025-07-29T11:48:36+00:00"
                        },
                        {
                            "id": "n5rzo0v",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5rzo0v/",
                            "body": "Yes. It won’t happen overnight",
                            "depth": 0,
                            "score": 1,
                            "author": "TowerOutrageous5939",
                            "replies": [],
                            "created_utc": "2025-07-29T11:51:34+00:00"
                        },
                        {
                            "id": "n5s08vt",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s08vt/",
                            "body": "Depends on the data science role. I focus more on experimentation and causal inference, so statistics, SQL, python are the basics. Beyond that are tools that will vary by team. \n\nML Eng and MLOps roles will have slightly different specs.",
                            "depth": 0,
                            "score": 1,
                            "author": "Sausage_Queen_of_Chi",
                            "replies": [],
                            "created_utc": "2025-07-29T11:55:23+00:00"
                        },
                        {
                            "id": "n5s4i7f",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s4i7f/",
                            "body": "I think it really depends on the role, the size of the team and who the users are.\n\nThe team that I'm in it's useful to know most of this. Sometimes I feel like I'm more like a data engineer than DS but I guess whatever to get things done.",
                            "depth": 0,
                            "score": 1,
                            "author": "Pvt_Twinkietoes",
                            "replies": [],
                            "created_utc": "2025-07-29T12:22:44+00:00"
                        },
                        {
                            "id": "n5s6gld",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s6gld/",
                            "body": "That's a whole team's requirement. Most of these are just \"suggestions\", and it happens not only in Data Science. Don't take it to heart too much. Just apply anyway.",
                            "depth": 0,
                            "score": 1,
                            "author": "ramenAtMidnight",
                            "replies": [],
                            "created_utc": "2025-07-29T12:34:48+00:00"
                        },
                        {
                            "id": "n5s88ar",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s88ar/",
                            "body": "Depends on how much you’re getting paid.",
                            "depth": 0,
                            "score": 1,
                            "author": "Bear4451",
                            "replies": [],
                            "created_utc": "2025-07-29T12:45:23+00:00"
                        },
                        {
                            "id": "n5s8k4x",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s8k4x/",
                            "body": "noup. all gon get automated",
                            "depth": 0,
                            "score": 1,
                            "author": "Future_Salamander_95",
                            "replies": [],
                            "created_utc": "2025-07-29T12:47:18+00:00"
                        },
                        {
                            "id": "n5s964f",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s964f/",
                            "body": "I would say, for a low-mid-senior position I would want a single hit in every bullet point here. Except for Python and ML that I would promote from mere \"experience\" to \"proficient\". But for all the rest, I'd basically wanted some experience in each category with at least one product / problem. So this description is both good and bad, depending on how it is used in practice.",
                            "depth": 0,
                            "score": 1,
                            "author": "ampanmdagaba",
                            "replies": [],
                            "created_utc": "2025-07-29T12:50:52+00:00"
                        },
                        {
                            "id": "n5s9rmb",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5s9rmb/",
                            "body": "It looks like great set of skills",
                            "depth": 0,
                            "score": 1,
                            "author": "MauiSuperWarrior",
                            "replies": [],
                            "created_utc": "2025-07-29T12:54:18+00:00"
                        },
                        {
                            "id": "n5se44y",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5se44y/",
                            "body": "They aren't looking for all of them. It's usually just one out of the options. Basically they are looking for someone with hands-on experience with GenAI in a cloud environment with automation and has basic data engineering experience ",
                            "depth": 0,
                            "score": 1,
                            "author": "magpie882",
                            "replies": [],
                            "created_utc": "2025-07-29T13:18:45+00:00"
                        },
                        {
                            "id": "n5sedgp",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5sedgp/",
                            "body": "you need to know they exist and what they do. So if you have a problem, you know where to start and what documentation to look up to. But for certain jobs they need you to know certain areas really well. \n\nBut in general, you are expected to be an expert in the fundamentals, not neccesarily in all the modern frameworks",
                            "depth": 0,
                            "score": 1,
                            "author": "LeaguePrototype",
                            "replies": [],
                            "created_utc": "2025-07-29T13:20:11+00:00"
                        },
                        {
                            "id": "n5snwjc",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5snwjc/",
                            "body": "On LinkedIn? Yes. Plus you have to be machine data scientist engineer",
                            "depth": 0,
                            "score": 1,
                            "author": "silverstone1903",
                            "replies": [],
                            "created_utc": "2025-07-29T14:10:03+00:00"
                        },
                        {
                            "id": "n5spktw",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5spktw/",
                            "body": "Yes, but not in the sense that you should be an expert in all of the technologies mentioned. For example, you only really need to know one deep learning framework (PyTorch usually). You only need to know one cloud platform (they all essentially work the same). You only need to know one form of SQL, and maybe have some experience dealing with some kind of NoSQL database (object-oriented or otherwise). MLOps and GenAI you likely don’t need to know much at all, those fall under different roles (DevOps, MLOps, ML Engineering, AI Engineering).",
                            "depth": 0,
                            "score": 1,
                            "author": "triggerhappy5",
                            "replies": [],
                            "created_utc": "2025-07-29T14:18:19+00:00"
                        },
                        {
                            "id": "n5t48h6",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5t48h6/",
                            "body": "My guess is they use deep learning in some way, and then want demonstrated experience and skill in 1 of the examples for each progressive bullet.\n\nTensorflow or Torch, one of the frameworks like HuggingFace, one of the cloud platforms and then some job scheduler and package management system.\n\nIt’s not unreasonable at all, though the list of skills is closer to MLE or Applied Scientist",
                            "depth": 0,
                            "score": 1,
                            "author": "[deleted]",
                            "replies": [],
                            "created_utc": "2025-07-29T15:28:12+00:00"
                        },
                        {
                            "id": "n5tb5ua",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5tb5ua/",
                            "body": "You don’t need to know everything but you should know at least one from each category unless you’re a new grad. Docker and kubernetes would be an MLE or MLops role which are occasionally posted as DS positions.",
                            "depth": 0,
                            "score": 1,
                            "author": "Fit-Employee-4393",
                            "replies": [],
                            "created_utc": "2025-07-29T16:00:20+00:00"
                        },
                        {
                            "id": "n5tcg75",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5tcg75/",
                            "body": "No.\n\nBut they do need to learn which of those skills are relevant to a given job and dive into them if necessary.",
                            "depth": 0,
                            "score": 1,
                            "author": "digiorno",
                            "replies": [],
                            "created_utc": "2025-07-29T16:06:25+00:00"
                        },
                        {
                            "id": "n5tcjxy",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5tcjxy/",
                            "body": "I have the same about as yours. I've seen it in Junior jobs listed in LinkedIn. So, I think I will never be enought hahahaha.",
                            "depth": 0,
                            "score": 1,
                            "author": "Good-Aardvark9900",
                            "replies": [],
                            "created_utc": "2025-07-29T16:06:54+00:00"
                        },
                        {
                            "id": "n5trntf",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5trntf/",
                            "body": "Recruiters often stack keywords to cast a wide net, but most hiring teams are just looking for someone with solid foundations (Python, SQL, stats, ML) and a willingness to learn the rest.\n\nStart with what aligns with your interests and goals—then go deeper from there. Think: one cloud, one deep learning framework, and build from a strong base.",
                            "depth": 0,
                            "score": 1,
                            "author": "DataCamp",
                            "replies": [],
                            "created_utc": "2025-07-29T17:16:32+00:00"
                        },
                        {
                            "id": "n5tsb40",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5tsb40/",
                            "body": "As a DS at a tech company, I’d say 1,2,5 are the most important. 3,4 and 6 are nice to have.",
                            "depth": 0,
                            "score": 1,
                            "author": "Hour_Sky6412",
                            "replies": [],
                            "created_utc": "2025-07-29T17:19:25+00:00"
                        },
                        {
                            "id": "n5tur6u",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5tur6u/",
                            "body": "The MLops one should be a role in its own. But everything else is pretty general stuff that a data scientist shouldn’t have any problem with.",
                            "depth": 0,
                            "score": 1,
                            "author": "EntropyRX",
                            "replies": [],
                            "created_utc": "2025-07-29T17:30:23+00:00"
                        },
                        {
                            "id": "n5twgu6",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5twgu6/",
                            "body": "If that’s from a job description, they are often looking for familiarity with at least one of those tools or skills or maybe another unlisted one that is similar.",
                            "depth": 0,
                            "score": 1,
                            "author": "[deleted]",
                            "replies": [],
                            "created_utc": "2025-07-29T17:38:06+00:00"
                        },
                        {
                            "id": "n5uhges",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5uhges/",
                            "body": "Yes, if you wanna be a good one at least.",
                            "depth": 0,
                            "score": 1,
                            "author": "AncientLion",
                            "replies": [],
                            "created_utc": "2025-07-29T19:14:47+00:00"
                        },
                        {
                            "id": "n5uyc51",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5uyc51/",
                            "body": "Hum that is a tough question. It really depends on how much you become an expert in a given domain. I encourage you to see the post from Chip Huyen, a Data Scientist that taught in Stanford: [https://huyenchip.com/2021/09/13/data-science-infrastructure.html](https://huyenchip.com/2021/09/13/data-science-infrastructure.html)",
                            "depth": 0,
                            "score": 1,
                            "author": "Narrow-Treacle-6460",
                            "replies": [],
                            "created_utc": "2025-07-29T20:34:44+00:00"
                        },
                        {
                            "id": "n5uyjy4",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5uyjy4/",
                            "body": "You forgot Apache Kafka, REST APIs, simulation and optimization tools, causal inference.",
                            "depth": 0,
                            "score": 1,
                            "author": "Far_Adeptness_9097",
                            "replies": [],
                            "created_utc": "2025-07-29T20:35:45+00:00"
                        },
                        {
                            "id": "n5vgps8",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5vgps8/",
                            "body": "where stats?",
                            "depth": 0,
                            "score": 1,
                            "author": "StannisSAS",
                            "replies": [],
                            "created_utc": "2025-07-29T22:04:00+00:00"
                        },
                        {
                            "id": "n5viry6",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5viry6/",
                            "body": "Nope. Clueless HR folks all parrot the same sets of skills. I would avoid any job that's focused on Generative AI.",
                            "depth": 0,
                            "score": 1,
                            "author": "CanYouPleaseChill",
                            "replies": [],
                            "created_utc": "2025-07-29T22:14:41+00:00"
                        },
                        {
                            "id": "n5w52tz",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5w52tz/",
                            "body": "If you want job in the top tier companies or new age startup. Doesn't have to be FAANG either.",
                            "depth": 0,
                            "score": 1,
                            "author": "agingmonster",
                            "replies": [],
                            "created_utc": "2025-07-30T00:15:37+00:00"
                        },
                        {
                            "id": "n5wewv8",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5wewv8/",
                            "body": "No. You need to learn how to interview then answer questions about the screenshot of your chart that’s in the PowerPoint",
                            "depth": 0,
                            "score": 1,
                            "author": "[deleted]",
                            "replies": [],
                            "created_utc": "2025-07-30T01:12:14+00:00"
                        },
                        {
                            "id": "n5wltee",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5wltee/",
                            "body": "I think companies put unreasonable demands as a soft quality gate. But on the job you're probably going to be alternating between notebooks/SQL and Excel.",
                            "depth": 0,
                            "score": 1,
                            "author": "ChavXO",
                            "replies": [],
                            "created_utc": "2025-07-30T01:52:26+00:00"
                        },
                        {
                            "id": "n5xa74m",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5xa74m/",
                            "body": "SQL + Python covers 90% of requirements.  Knowing how to make your own tables is helpful though!",
                            "depth": 0,
                            "score": 1,
                            "author": "LoiteringMonk",
                            "replies": [],
                            "created_utc": "2025-07-30T04:32:02+00:00"
                        },
                        {
                            "id": "n5xl0oy",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5xl0oy/",
                            "body": "😵‍💫😵‍💫",
                            "depth": 0,
                            "score": 1,
                            "author": "hrs_thkur",
                            "replies": [],
                            "created_utc": "2025-07-30T06:02:24+00:00"
                        },
                        {
                            "id": "n5zf1rg",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n5zf1rg/",
                            "body": "Depends on the company, since it depends on what kind of project youre doing.  \n\nIf you don't work with LLM obviously non of the Gen-AI stuff will be useful.\n\nThen, even if you know all of these, if you do optimisations and you don't know tools like Gurobi, then you won't be useful too.\n\nAgain, remember that most hiring managers have no idea what skills you need for the job.  Try to stalk team members' profile for that.",
                            "depth": 0,
                            "score": 1,
                            "author": "WelkinSL",
                            "replies": [],
                            "created_utc": "2025-07-30T14:21:29+00:00"
                        },
                        {
                            "id": "n65c47a",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n65c47a/",
                            "body": "All is in excel. No need. Data science isn’t bit about tool. But about interpretation and communication of data. So chill",
                            "depth": 0,
                            "score": 1,
                            "author": "CardMysterious3024",
                            "replies": [
                                {
                                    "id": "n65fx5n",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n65fx5n/",
                                    "body": "But they likely will not use graphs like that and ask me about interpretation lol. I will focus on a few of these at least.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-07-31T12:07:25+00:00"
                                }
                            ],
                            "created_utc": "2025-07-31T11:42:47+00:00"
                        },
                        {
                            "id": "n65qy31",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n65qy31/",
                            "body": "I am a junior DS, and I feel lost with all the tools I have to be familiar with. It seems like a neverending story, or circles of hell.",
                            "depth": 0,
                            "score": 1,
                            "author": "Cold_Ferret_1085",
                            "replies": [
                                {
                                    "id": "n669cq0",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n669cq0/",
                                    "body": "It's not that bad if you give yourself enough time. I know 60% of mentioned here and well it took me 4 years.. Be patient :)",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "CableInevitable6840",
                                    "replies": [
                                        {
                                            "id": "n66e7cy",
                                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n66e7cy/",
                                            "body": "Thank you for the words of encouragement.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Cold_Ferret_1085",
                                            "replies": [],
                                            "created_utc": "2025-07-31T15:06:36+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-07-31T14:43:52+00:00"
                                }
                            ],
                            "created_utc": "2025-07-31T13:11:30+00:00"
                        },
                        {
                            "id": "n6i3zac",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n6i3zac/",
                            "body": "I always go off Matt Zuckerbergs quote where he says you just need to know enough to be \"dangerous\"",
                            "depth": 0,
                            "score": 1,
                            "author": "DataScientist305",
                            "replies": [],
                            "created_utc": "2025-08-02T09:59:55+00:00"
                        },
                        {
                            "id": "n6jd98y",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n6jd98y/",
                            "body": "It doesn’t hurt",
                            "depth": 0,
                            "score": 1,
                            "author": "Majestic_Pool2639",
                            "replies": [],
                            "created_utc": "2025-08-02T15:09:33+00:00"
                        },
                        {
                            "id": "n6wz7ag",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n6wz7ag/",
                            "body": "which out of these bullet points do u guys think is the most important to have for the role?",
                            "depth": 0,
                            "score": 1,
                            "author": "alohamorra",
                            "replies": [],
                            "created_utc": "2025-08-04T18:30:06+00:00"
                        },
                        {
                            "id": "n6y5uhh",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n6y5uhh/",
                            "body": "SQL, Python, basic stats got me my first DS job!",
                            "depth": 0,
                            "score": 1,
                            "author": "[deleted]",
                            "replies": [],
                            "created_utc": "2025-08-04T21:58:31+00:00"
                        },
                        {
                            "id": "n76dn9s",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n76dn9s/",
                            "body": "This is exactly my skills section on my resume",
                            "depth": 0,
                            "score": 1,
                            "author": "Appropriate-Line-319",
                            "replies": [
                                {
                                    "id": "n7jtwhf",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/n7jtwhf/",
                                    "body": "You know all three cloud platforms? And applying for data scientist or senior data scientist position?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-08-08T05:17:52+00:00"
                                }
                            ],
                            "created_utc": "2025-08-06T04:38:15+00:00"
                        },
                        {
                            "id": "na9refj",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/na9refj/",
                            "body": "A database is absolutely essential. Without it, data cannot be stored, organized, or accessed efficiently for analysis and modeling.",
                            "depth": 0,
                            "score": 1,
                            "author": "whoiam1101",
                            "replies": [
                                {
                                    "id": "naejrbe",
                                    "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/naejrbe/",
                                    "body": "But then databases also have types..",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "CableInevitable6840",
                                    "replies": [],
                                    "created_utc": "2025-08-24T12:38:49+00:00"
                                }
                            ],
                            "created_utc": "2025-08-23T16:36:29+00:00"
                        },
                        {
                            "id": "nmb575n",
                            "url": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/nmb575n/",
                            "body": "Stats.",
                            "depth": 0,
                            "score": 1,
                            "author": "LifeCheesecake6429",
                            "replies": [],
                            "created_utc": "2025-10-31T03:01:44+00:00"
                        }
                    ],
                    "permalink": "https://reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/"
                },
                {
                    "id": "1dw8mz3",
                    "kind": "post",
                    "score": 14,
                    "author": "Ok-Spend5655",
                    "created": "2024-07-05T21:12:41+00:00",
                    "preview": "Hi all,\n\nMuch like many of you, I've been working for many years in many different fields (management and sales mostly) ",
                    "comments": [
                        {
                            "id": "lbsyckm",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbsyckm/",
                            "body": "I don’t understand why so many people build stuff and THEN start thinking about what to do with it. I see a post like this most every day. It’s puzzling to me. \n\nTo answer your question, no investor (other than friends/family) is going to invest in an MVP with no users and no plan. Forget about investors for the foreseeable future. \n\nYou need to get users. I don’t know what your app is, so it hard to even give suggestions - but if it’s really a niche as you say, I’d just start reaching out to people in that niche and offer them a “free lifetime (or a year) subscription” in exchange for doing a user interview and filing out a feedback form. \n\nYou could also look into having a referral system so that as you do start to get users, they multiply with minimum effort from you.",
                            "depth": 0,
                            "score": 34,
                            "author": "UntoldGood",
                            "replies": [
                                {
                                    "id": "lbszcdx",
                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbszcdx/",
                                    "body": "This person can only validate demand for a solution by a sign-up page at best - that don't have an MVP, they have a mock up.",
                                    "depth": 1,
                                    "score": 5,
                                    "author": "cyber2024",
                                    "replies": [
                                        {
                                            "id": "lbszhiz",
                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbszhiz/",
                                            "body": "They said it would be ready for “basic testing” in the next few weeks…?",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "UntoldGood",
                                            "replies": [],
                                            "created_utc": "2024-07-05T21:29:14+00:00"
                                        },
                                        {
                                            "id": "lbt12pd",
                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbt12pd/",
                                            "body": "So an MVP is only something that has users then? I thought it was a functioning product that shows the capabilities. \n\nIf I need users then I would need a back end server, which I could do. Maybe more than a few weeks then.\n\nBut it's not a mock up, it's a functioning app",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Ok-Spend5655",
                                            "replies": [
                                                {
                                                    "id": "lbtl3um",
                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtl3um/",
                                                    "body": "An MVP is a minimum viable product you need to accomplish a goal, emphasis on having a goal in the first place: gaining first users and live feedback, attracting investors, building an example for a full development team to use as a blueprint, etc. \n\nIf you want to pursue investors, wrap up your MVP, take screenshots, and write out what functionality exists, what other functionality you envision, and why you think it will have a product market fit, then start shopping it around",
                                                    "depth": 3,
                                                    "score": 6,
                                                    "author": "bytewise_agency",
                                                    "replies": [
                                                        {
                                                            "id": "lbtl6a7",
                                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtl6a7/",
                                                            "body": "Thanks! This is helpful",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "Ok-Spend5655",
                                                            "replies": [],
                                                            "created_utc": "2024-07-05T23:49:42+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2024-07-05T23:49:14+00:00"
                                                },
                                                {
                                                    "id": "lbton6m",
                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbton6m/",
                                                    "body": "Watch all the videos in this playlist, and it will tell you everything in detail: https://youtube.com/playlist?list=PLda67x2O472eZ2kicfuZrliRc7QPd_kJB&si=PRcXDoo1p_Ht_kX3",
                                                    "depth": 3,
                                                    "score": 4,
                                                    "author": "Severe_Abalone_2020",
                                                    "replies": [],
                                                    "created_utc": "2024-07-06T00:13:56+00:00"
                                                },
                                                {
                                                    "id": "lbtnhcr",
                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtnhcr/",
                                                    "body": "An MVP is the smallest thing that will earn you a customer on its merits. What will someone pay for? \n\nYou have a functional prototype from sounds of it.",
                                                    "depth": 3,
                                                    "score": 3,
                                                    "author": "serviceled",
                                                    "replies": [
                                                        {
                                                            "id": "lbto6nf",
                                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbto6nf/",
                                                            "body": "You're probably accurate in your assessment. Right now it's functional prototype since it's 75% complete. By the time it's 100% it will be an MVP with a selected small user base specifically for data collection, testing, and feedback.",
                                                            "depth": 4,
                                                            "score": 4,
                                                            "author": "Ok-Spend5655",
                                                            "replies": [],
                                                            "created_utc": "2024-07-06T00:10:44+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2024-07-06T00:05:48+00:00"
                                                },
                                                {
                                                    "id": "lbul5w5",
                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbul5w5/",
                                                    "body": "I think from next time you should always build a backend to handle some load of users to get some users to test your app and get valuable feedback . \n\nThen after that you can upgrade to final product based on the feedback and build the backend for scalability\n\nMVP is not only for showing capabilities but also to validate the product, find product - market fit and pivot if necessary",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "fireplay_00",
                                                    "replies": [],
                                                    "created_utc": "2024-07-06T04:18:21+00:00"
                                                },
                                                {
                                                    "id": "lbvw4ew",
                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbvw4ew/",
                                                    "body": "The V in MVP is \"viable\".  Is the product viable? Does it serve an *actual* need? How have you proved that? What are customers willing to pay for it?  How many possible customers are there?",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "okawei",
                                                    "replies": [],
                                                    "created_utc": "2024-07-06T12:37:31+00:00"
                                                },
                                                {
                                                    "id": "lbtzfk4",
                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtzfk4/",
                                                    "body": "It’s not a functioning app until it can handle a load over time.  Have you put much into hardware engineering or is it all software engineering?",
                                                    "depth": 3,
                                                    "score": 0,
                                                    "author": "secretrapbattle",
                                                    "replies": [
                                                        {
                                                            "id": "lbtzxac",
                                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtzxac/",
                                                            "body": "This is purely software, not hardware. The ability to handle a load over time is where I think I would need investors once the demo is complete with feedback, edits are made, MVP is rolled out to controlled user base for data analytics, functionality, level of engagement and usage, etc., then potentially investors to pump money into it so it can do heavy lifting",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "Ok-Spend5655",
                                                            "replies": [
                                                                {
                                                                    "id": "lbu0tb8",
                                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbu0tb8/",
                                                                    "body": "I can clone Spotify as a graphic user interface, but without the storage capacity and load balancers and server distribution, all I really have is a clone of a GUI not an actual functioning system or an app.\n\nI have no idea what you’ve actually built, but I can tell you that if it’s any form of a functional network, you’re gonna really have to put a lot of thought into your hardware engineering and your entire system engineering. If you don’t understand hardware, you should definitely team up with somebody that does. The software sits on a server and the server is its own beast.\n\nSystems can’t be an afterthought.",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "secretrapbattle",
                                                                    "replies": [
                                                                        {
                                                                            "id": "lbv265w",
                                                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbv265w/",
                                                                            "body": "Guarantee they go serverless",
                                                                            "depth": 6,
                                                                            "score": 1,
                                                                            "author": "Flimsy-Possible4884",
                                                                            "replies": [
                                                                                {
                                                                                    "id": "lbvbwpx",
                                                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbvbwpx/",
                                                                                    "body": "Can you explain what you’re saying?",
                                                                                    "depth": 7,
                                                                                    "score": 1,
                                                                                    "author": "secretrapbattle",
                                                                                    "replies": [],
                                                                                    "created_utc": "2024-07-06T09:04:06+00:00"
                                                                                }
                                                                            ],
                                                                            "created_utc": "2024-07-06T07:09:03+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2024-07-06T01:41:14+00:00"
                                                                },
                                                                {
                                                                    "id": "lbu0l27",
                                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbu0l27/",
                                                                    "body": "I can only suggest you watch mock interviews. Without both ends of the engineering considered you really don’t have a MVP. Sites constantly break and apps constantly break as the network grows. You’ve built part of an idea.",
                                                                    "depth": 5,
                                                                    "score": 0,
                                                                    "author": "secretrapbattle",
                                                                    "replies": [],
                                                                    "created_utc": "2024-07-06T01:39:32+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2024-07-06T01:34:47+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2024-07-06T01:31:13+00:00"
                                                }
                                            ],
                                            "created_utc": "2024-07-05T21:38:47+00:00"
                                        }
                                    ],
                                    "created_utc": "2024-07-05T21:28:21+00:00"
                                }
                            ],
                            "created_utc": "2024-07-05T21:22:19+00:00"
                        },
                        {
                            "id": "lbt1bf6",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbt1bf6/",
                            "body": "Do a ton of outreach and sales. Participate in communities, cold email or message people on LinkedIn, attend in-person events, etc. Now that you have something people can actually use and respond to, your only job is to get people to pay for it. Even if it's only at 75%.",
                            "depth": 0,
                            "score": 3,
                            "author": "jallabi",
                            "replies": [
                                {
                                    "id": "lbt2rgi",
                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbt2rgi/",
                                    "body": "Beautiful part is that it's a free app with a premium paid feature. The premium feature incorporates AI specific to the user and their needs",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Ok-Spend5655",
                                    "replies": [
                                        {
                                            "id": "lbt4agh",
                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbt4agh/",
                                            "body": "The dangerous part is that it's a free app with premium features. You might be tempted into \"build it and customers will come\" mentality, or you might get a ton of users who you can't ever figure out how monetize because of perceived value mismatch.\n\nI recommend sales first over everything. Real sales, not freemium users. Then consider fundraising when you know what that looks like",
                                            "depth": 2,
                                            "score": 3,
                                            "author": "jallabi",
                                            "replies": [
                                                {
                                                    "id": "lbtcf3m",
                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtcf3m/",
                                                    "body": "I was thinking this, especially if it's being hosted with the big cloud providers like Azure or AWS. Unless he's in one of the founder programs where they give you free credits for a year.",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "most_crispy_owl",
                                                    "replies": [],
                                                    "created_utc": "2024-07-05T22:50:48+00:00"
                                                }
                                            ],
                                            "created_utc": "2024-07-05T21:58:13+00:00"
                                        }
                                    ],
                                    "created_utc": "2024-07-05T21:48:59+00:00"
                                }
                            ],
                            "created_utc": "2024-07-05T21:40:17+00:00"
                        },
                        {
                            "id": "lbtg0iu",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtg0iu/",
                            "body": "So, to summarize against many of the responses below: you have a (almost working) prototype, not an MVP. M, V, and P are all critical elements.\n\nWhether that matters or is just an error of vocabulary depends on where _you_ think you are (ignoring the buzzwords and acronyms).\n\nIf you believe you have encapsulated the essence of your idea into something someone will pay for (zero to one problem), based on your description, you don't.\n\nIf you believe you have something to show around to get acceptance of the _idea_ before you actually build the MVP, that better suits what you claim above but you also send mixed messages about expectations.\n\nIn EITHER case, if you haven't spoken to prospective customers already, you've (likely) jumped the gun. Committments before code gets ytou the highest opportunity for success... if you can't move the tangible interest needle without the code, your chances with code aren't much higher.\n\nIf you're in sales for extended periods of time, I question your emphasis on this:\n\n> solves the problem of being in an oversaturated market with a ton of customizable features (it can simple or complex based on what you want to use it for), \n\nIn an oversaturated market (your description), you need clearly defined value. Unless the pain point is \"not enough customization\", this is not the high-percentage breaktrhough you present it as. It'll nearly always be muddled, confusing, and discounted as a serious competitor to the big names even at a bargain-basement price. (cf The Innovator's Dilemma)\n\n> What should be my next step? \n\nStop working on the code, step back, and refine your value proposition until it's razor sharp. Then sharpen it some more. The \"conventional wisdom\" says your solution has to be at least 10x better... I do quibble with that at times but when your market is already a cacophany of options, you have to find the right mechanism to cut through the noise. \n\nMe-too features and \"2x as good at half the price\" is unlikely to be good enough.\n\nIf you're not me-too and you've confirmed this via market and customer validation, your next steps _at this stage_ will almost be self-evident because whatever you did to get your early contacts on-board in a committed way will lay the foundation for getting paying customers into an _actual_ MVP that reflects what you have learned about the product landscape to date.",
                            "depth": 0,
                            "score": 2,
                            "author": "bmbphotos",
                            "replies": [],
                            "created_utc": "2024-07-05T23:14:48+00:00"
                        },
                        {
                            "id": "lbtz5xv",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtz5xv/",
                            "body": "Onboarding",
                            "depth": 0,
                            "score": 2,
                            "author": "secretrapbattle",
                            "replies": [],
                            "created_utc": "2024-07-06T01:29:17+00:00"
                        },
                        {
                            "id": "lbt0ugn",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbt0ugn/",
                            "body": "What's the niche? And what resources are you hoping to get out of an investor?",
                            "depth": 0,
                            "score": 1,
                            "author": "TyPhyter",
                            "replies": [
                                {
                                    "id": "lbt2lgp",
                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbt2lgp/",
                                    "body": "It's within the fitness sector, but this particular type of app has low competition at the moment. There are a few apps that are similar with good size user bases.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Ok-Spend5655",
                                    "replies": [],
                                    "created_utc": "2024-07-05T21:48:00+00:00"
                                }
                            ],
                            "created_utc": "2024-07-05T21:37:21+00:00"
                        },
                        {
                            "id": "lbt315a",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbt315a/",
                            "body": "Having a near-complete MVP for your app targeting a popular niche with a unique solution is a great start! Before seeking investors, prioritize a fully functional version with a backend for user testing and feedback. Gather valuable insights from potential users to refine your MVP. Build pre-launch buzz with a landing page and targeted social media promotion. While investors offer funding, they require a strong plan. With your sales background, consider bootstrapping to maintain control while gathering feedback. Explore startup incubators for mentorship, networking, and potential funding. Remember, user focus, continuous improvement, and leveraging available resources are key to your app's success!",
                            "depth": 0,
                            "score": 1,
                            "author": "Binarydesignhub",
                            "replies": [],
                            "created_utc": "2024-07-05T21:50:36+00:00"
                        },
                        {
                            "id": "lbt5twu",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbt5twu/",
                            "body": "Get a potential customer first, then code.\n\nIt's too late for that, of course, so STOP all coding immediately and start looking.",
                            "depth": 0,
                            "score": 1,
                            "author": "funbike",
                            "replies": [
                                {
                                    "id": "lbtzgqn",
                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtzgqn/",
                                    "body": "I have several potential customers, I used to be in the industry the app is designed for",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Ok-Spend5655",
                                    "replies": [
                                        {
                                            "id": "lbx7zjo",
                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbx7zjo/",
                                            "body": "Then deploy to one of them ASAP.  Only do things in the direct path to accomplishing that single goal.  Only work on remaining MVP features that one customer needs.  Repeat for 2 or more other customers.  Then market it with testimonials on your landing page.\n\nEvery succeesful *software* startup I've been in has done it this way.  The 2 failures didn't, we wrote a product and tried to market post-MVP.  Much harder to succeed.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "funbike",
                                            "replies": [],
                                            "created_utc": "2024-07-06T17:44:16+00:00"
                                        }
                                    ],
                                    "created_utc": "2024-07-06T01:31:28+00:00"
                                }
                            ],
                            "created_utc": "2024-07-05T22:07:57+00:00"
                        },
                        {
                            "id": "lbt7mn9",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbt7mn9/",
                            "body": "What do you mean you have no backend? Is nothing saved at the moment?",
                            "depth": 0,
                            "score": 1,
                            "author": "most_crispy_owl",
                            "replies": [
                                {
                                    "id": "lbt8awa",
                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbt8awa/",
                                    "body": "It's all saved, I would need to incorporate a client-server (which it's not ready for just yet). Right now it's almost ready for basic testing with a list of selected users to play around the features and give feedback on what they love/hate/need/don't want.\n\nI'm going to have a beta test before finalizing every feature, then an alpha test. Then open it up to a list of about 1,000 users in the niche to give it a full run.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Ok-Spend5655",
                                    "replies": [
                                        {
                                            "id": "lbtf26f",
                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtf26f/",
                                            "body": "Uhhh… you are going to do a Beta test and THEN an Alpha? Not sure you understand those designations. Alpha comes before Beta. Alpha tests are usually with a development partner(s) with full knowledge it is being built while they are using it, it’s supposed to be rough and have problems. Beta test usually means you are ready for production, but smart enough to know something will break that you didn’t think of so you slap Beta in there to cover your ass.",
                                            "depth": 2,
                                            "score": 4,
                                            "author": "DDayDawg",
                                            "replies": [],
                                            "created_utc": "2024-07-05T23:08:25+00:00"
                                        },
                                        {
                                            "id": "lbta2b3",
                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbta2b3/",
                                            "body": "What would the client server allow you to do? I'm a software engineer, so I'm curious about this sort of thing",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "most_crispy_owl",
                                            "replies": [
                                                {
                                                    "id": "lbtbon8",
                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtbon8/",
                                                    "body": "Basically it's a server that hosts a large number of users and info. Like how IG can host millions of users",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "Ok-Spend5655",
                                                    "replies": [
                                                        {
                                                            "id": "lbtex4y",
                                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtex4y/",
                                                            "body": "The answers to u/most_crispy_owl question and you saying you’ll have a demonstrable MVP soon,ready for testing, especially the last reply, makes me think you know less than you let on and you’re not where you think you are. \n\nMVP means minimal viable product. What you’re describing is non functioning demo. \n\nWhat do you mean MVP to test but no backend. How do you do that? Figma prototype? No code solution? Simulated screens?",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "rentifiapp",
                                                            "replies": [
                                                                {
                                                                    "id": "lbtfguy",
                                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtfguy/",
                                                                    "body": "It's why I asked if it was a website. To be fair, they could be the non technical founder, or they're paying people to do the tech side.\n\nIt could make some sense if they're describing a managed cloud database or moving the app to the cloud",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "most_crispy_owl",
                                                                    "replies": [],
                                                                    "created_utc": "2024-07-05T23:11:08+00:00"
                                                                },
                                                                {
                                                                    "id": "lbtgzta",
                                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtgzta/",
                                                                    "body": "Wow. I had no idea people didn't realize you could create a demo app that pretends to take user \"data\" just as a demo but doesn't save it anywhere. It's just dummy placeholders to show functionality of the app.",
                                                                    "depth": 5,
                                                                    "score": -1,
                                                                    "author": "Ok-Spend5655",
                                                                    "replies": [
                                                                        {
                                                                            "id": "lbti5vo",
                                                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbti5vo/",
                                                                            "body": "That’s not an MVP tho… That’s a demo. I do this for a living so there is no misunderstanding about how a demo can be built. The way you talk about it sounds like there is a disconnect somewhere which is what I am trying to figure out. \n\nWhat are you using to build it if you don’t mind sharing.",
                                                                            "depth": 6,
                                                                            "score": 1,
                                                                            "author": "rentifiapp",
                                                                            "replies": [
                                                                                {
                                                                                    "id": "lbtkafv",
                                                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtkafv/",
                                                                                    "body": "React Native",
                                                                                    "depth": 7,
                                                                                    "score": 1,
                                                                                    "author": "Ok-Spend5655",
                                                                                    "replies": [
                                                                                        {
                                                                                            "id": "lbtkm1w",
                                                                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtkm1w/",
                                                                                            "body": "I meant your MVP. \n\nPromise I am just trying to get the whole picture and are in no way shape or form trying to give you a hard time.",
                                                                                            "depth": 8,
                                                                                            "score": 1,
                                                                                            "author": "rentifiapp",
                                                                                            "replies": [
                                                                                                {
                                                                                                    "id": "lbtn8a1",
                                                                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtn8a1/",
                                                                                                    "body": "It's not there yet. 75% complete, so the demo is functional.",
                                                                                                    "depth": 9,
                                                                                                    "score": 1,
                                                                                                    "author": "Ok-Spend5655",
                                                                                                    "replies": [],
                                                                                                    "created_utc": "2024-07-06T00:03:59+00:00"
                                                                                                }
                                                                                            ],
                                                                                            "created_utc": "2024-07-05T23:45:53+00:00"
                                                                                        }
                                                                                    ],
                                                                                    "created_utc": "2024-07-05T23:43:44+00:00"
                                                                                }
                                                                            ],
                                                                            "created_utc": "2024-07-05T23:29:13+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2024-07-05T23:21:21+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2024-07-05T23:07:29+00:00"
                                                        },
                                                        {
                                                            "id": "lbtfxo4",
                                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtfxo4/",
                                                            "body": "You are scaring me right now. How can the MVP be functional without the server? What is on the server? We taking database? Login info? Customer settings? Are they communicating with other users? We talking social media type setup? \n\nThe difference between some user settings being saved and allowing social interaction is HUGE. If there is public facing social with posting and stuff then it jumps another notch into incredibly difficult. We are trying to gauge how big your dreams are here.",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "DDayDawg",
                                                            "replies": [
                                                                {
                                                                    "id": "lbtk9go",
                                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtk9go/",
                                                                    "body": "I just saw your reply after I commented… we are both saying the same thing…",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "rentifiapp",
                                                                    "replies": [],
                                                                    "created_utc": "2024-07-05T23:43:33+00:00"
                                                                },
                                                                {
                                                                    "id": "lbtnykc",
                                                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtnykc/",
                                                                    "body": "A function of the app has a social aspect on a somewhat smaller scale. However, with the customization of the app per user, you may not use the social aspect of it, you may just it's baseline functions.\n\nIt's a semi-large dream. I know not to take on the big dogs in the yard yet. The idea is to cater to certain niche and provide them with tools to either grow their brand, interact with others in similar circles, or use it's AI component to specifically cater to it's users unique goals and needs.\n\nI know I'm being purposely vague since I'm in the process of finalizing the LLC and patenting the idea legally.",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "Ok-Spend5655",
                                                                    "replies": [
                                                                        {
                                                                            "id": "lbuqp7b",
                                                                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbuqp7b/",
                                                                            "body": "Software patents are largely dead at this point. It’s a laborious and expensive process that won’t protect you. Best to focus on getting your product built and growing market share instead of trying to patent.\n\nIt’s fine to be cagey, but you have to understand that for those of us who are technical startup founders this is all sounding a little odd.\n\nJust to level set, for a non-technical founder who doesn’t do software development for a living, to go from idea to a real MVP should cost in the neighborhood of $500,000. It can be reduced a lot of ways but it’s still expensive. If you are hacking together an MVP as a novice programmer you just need to understand that will likely have to be completely redone at some point. We all want to help here, this is just all sounding a little out there.",
                                                                            "depth": 6,
                                                                            "score": 1,
                                                                            "author": "DDayDawg",
                                                                            "replies": [],
                                                                            "created_utc": "2024-07-06T05:08:45+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2024-07-06T00:09:10+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2024-07-05T23:14:16+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2024-07-05T22:45:59+00:00"
                                                }
                                            ],
                                            "created_utc": "2024-07-05T22:35:25+00:00"
                                        }
                                    ],
                                    "created_utc": "2024-07-05T22:23:54+00:00"
                                }
                            ],
                            "created_utc": "2024-07-05T22:19:34+00:00"
                        },
                        {
                            "id": "lbtkhep",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtkhep/",
                            "body": "Give an early bird discount and get some users. Take feedback from them and see if you can improve it.",
                            "depth": 0,
                            "score": 1,
                            "author": "Dramatic_Staff7340",
                            "replies": [
                                {
                                    "id": "lbtl8jn",
                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtl8jn/",
                                    "body": "Will do",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Ok-Spend5655",
                                    "replies": [],
                                    "created_utc": "2024-07-05T23:50:08+00:00"
                                }
                            ],
                            "created_utc": "2024-07-05T23:45:01+00:00"
                        },
                        {
                            "id": "lbtr3hn",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtr3hn/",
                            "body": "Best thing to do is to reach out to all of the people you interviewed before defining your product. They’re the ones who you built it for.",
                            "depth": 0,
                            "score": 1,
                            "author": "DancinWithWolves",
                            "replies": [
                                {
                                    "id": "lbtz8rh",
                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtz8rh/",
                                    "body": "Thank you, this is helpful. I appreciate it 🙏",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Ok-Spend5655",
                                    "replies": [],
                                    "created_utc": "2024-07-06T01:29:52+00:00"
                                }
                            ],
                            "created_utc": "2024-07-06T00:31:11+00:00"
                        },
                        {
                            "id": "lbuqow0",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbuqow0/",
                            "body": "USERS, USERS, USERS. \n\nReach out.",
                            "depth": 0,
                            "score": 1,
                            "author": "Born2RetireNWin",
                            "replies": [],
                            "created_utc": "2024-07-06T05:08:40+00:00"
                        },
                        {
                            "id": "lbxrnns",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbxrnns/",
                            "body": "have you read the lean start up? Id suggest validating the idea before looking for investors.",
                            "depth": 0,
                            "score": 1,
                            "author": "sauce0neverything",
                            "replies": [],
                            "created_utc": "2024-07-06T19:38:56+00:00"
                        },
                        {
                            "id": "lbxydp1",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbxydp1/",
                            "body": "Once you have the MVP, you want to go out and get users to try your product. Make sure you have some feedback mechanism to continue to validate your MVP. This could be 1 on 1 feedback sessions or a built in mechanism to gather feedback.\n\n  \nThe one thing about startups is that there are a lot of things you probably want to do concurrently. If there is real traction, of course you want to start looking for investors. But just like sales, you need time to \"build those relationships\" with investors (it isn't 1 call and thats it).",
                            "depth": 0,
                            "score": 1,
                            "author": "objectId0",
                            "replies": [],
                            "created_utc": "2024-07-06T20:19:34+00:00"
                        },
                        {
                            "id": "lc0altc",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lc0altc/",
                            "body": "I would create a landingpage for the project right away and have people sign up for a waitlist. Then I would start promoting this in my email signature, socials etc. This serves two purposes. You kind of start validating the idea. No signups - maybe no demand for the product. On the other hand if you do get sign ups you have a nice list to promotote your product to when it goes live.\nBest of luck to you.",
                            "depth": 0,
                            "score": 1,
                            "author": "jakobjelling",
                            "replies": [],
                            "created_utc": "2024-07-07T06:47:30+00:00"
                        },
                        {
                            "id": "lc0qj2o",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lc0qj2o/",
                            "body": "Investors can't help you with that. They can only invest. \n\nPlease watch all videos:\n\nhttps://www.youtube.com/@ycombinator\n\nhttps://www.youtube.com/@ycvault\n\n\nThey are very helpful for me 😎",
                            "depth": 0,
                            "score": 1,
                            "author": "tonko81",
                            "replies": [],
                            "created_utc": "2024-07-07T09:56:36+00:00"
                        },
                        {
                            "id": "lbtko20",
                            "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtko20/",
                            "body": "Near complete isn’t good enough. You either need landing page signups need traction or a completed app. \n\nAs you have been good in sales start with partnerships and LOIs before the app is launched so you have something to show investors. \n\nAlso I would say join a venture studio or accelerator to make sure some of these common questions are answered by folks with experience rather than by strangers on reddit.",
                            "depth": 0,
                            "score": 0,
                            "author": "sonicadishservedcold",
                            "replies": [
                                {
                                    "id": "lbtl3ai",
                                    "url": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/lbtl3ai/",
                                    "body": "Thanks!",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Ok-Spend5655",
                                    "replies": [],
                                    "created_utc": "2024-07-05T23:49:09+00:00"
                                }
                            ],
                            "created_utc": "2024-07-05T23:46:16+00:00"
                        }
                    ],
                    "permalink": "https://reddit.com/r/startups/comments/1dw8mz3/mvp_created_where_to_go_from_here/"
                }
            ],
            "summary": "Users are seeking server configuration recommendations for a production backend using PostgreSQL, FastAPI, and Google Vertex Search for beta testing with 100 users, focusing on cost-effective and scalable solutions.",
            "sentiment": "neutral",
            "pain_points": [
                {
                    "type": "technical",
                    "issue": "Lack of specific server configuration guidance for production deployment",
                    "description": "Users are unsure how to configure their backend for production use with 100 beta users, needing recommendations for cloud infrastructure, database setup, and API deployment.",
                    "example_quote": {
                        "id": null,
                        "url": null,
                        "text": "I am building an ai based saas startup which uses postgresql, fastapi, google vertex search and various ai providers i want to deploy my production backend to cloud, what are the suggested server configuration for initial beta testing for about 100 users ?",
                        "score": null,
                        "author": null
                    },
                    "system_actions": [
                        {
                            "title": "Recommend cloud provider selection",
                            "validation": "AWS, GCP, and Azure offer serverless options and free tiers suitable for beta testing.",
                            "recommendation": "Evaluate AWS RDS for PostgreSQL, GCP Cloud SQL, or Azure Database for PostgreSQL for managed database services.",
                            "proposed_solution": "Choose a cloud provider based on cost, scalability, and ease of integration with PostgreSQL and FastAPI."
                        }
                    ],
                    "why_this_is_pain": "Without proper configuration, the backend may not scale, could incur high costs, or lack reliability for beta testing.",
                    "user_suggested_solutions": [
                        {
                            "solution": "Focus on cost-effective cloud providers like AWS, GCP, or Azure for initial deployment.",
                            "example_quote": {
                                "id": null,
                                "url": null,
                                "text": "I would suggest starting with AWS or GCP for their generous free tiers and scalable options for a beta deployment.",
                                "score": null,
                                "author": null
                            }
                        }
                    ]
                },
                {
                    "type": "financial",
                    "issue": "Unclear scalability and cost management for 100 users",
                    "description": "Users are concerned about managing costs and ensuring the backend can handle 100 beta users without overspending.",
                    "example_quote": {
                        "id": null,
                        "url": null,
                        "text": "What are the suggested server configuration for initial beta testing for about 100 users ?",
                        "score": null,
                        "author": null
                    },
                    "system_actions": [
                        {
                            "title": "Suggest serverless deployment options",
                            "validation": "Serverless architectures scale automatically and only charge for actual usage, ideal for beta testing.",
                            "recommendation": "Consider AWS Lambda with API Gateway or Google Cloud Run for hosting the FastAPI application.",
                            "proposed_solution": "Deploy the FastAPI backend using serverless functions to pay-per-use."
                        }
                    ],
                    "why_this_is_pain": "Unexpected costs or performance issues can derail a beta testing phase and waste resources.",
                    "user_suggested_solutions": [
                        {
                            "solution": "Use serverless or managed services to minimize upfront costs.",
                            "example_quote": {
                                "id": null,
                                "url": null,
                                "text": "Serverless options like AWS Lambda or Google Cloud Functions can reduce costs during beta testing.",
                                "score": null,
                                "author": null
                            }
                        }
                    ]
                }
            ],
            "signal_count": 3,
            "relevance_score": 85,
            "brands_mentioned": [
                "Google Vertex Search",
                "FastAPI",
                "PostgreSQL"
            ],
            "demographic_signals": [
                "startup founders",
                "developers",
                "saas builders"
            ]
        },
        {
            "id": "theme_2",
            "title": "FastAPI Production Deployment",
            "quotes": [
                {
                    "id": "j359kbe",
                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j359kbe/",
                    "text": "I’m new to Python and didn’t understand a single bullet point. So much to learn!\n\n(If anyone is able to break down the bullets to be newb friendly, it would be much appreciated)",
                    "score": 58,
                    "author": "XMACROSSD"
                },
                {
                    "id": "j36wyr1",
                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36wyr1/",
                    "text": "Holy shit, your comment made me realise I'm actually not a beginner any more!!\n\nQuick simple explanations:\n\nGunicorn - lets python talk to web servers\n\nDocker - containerising everything so you don't have to reinstall absolutely every little package to use it on a new system/computer (all you need i",
                    "score": 36,
                    "author": "Backlists"
                },
                {
                    "id": "j35v9yn",
                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j35v9yn/",
                    "text": "You should consider moving from an app singleton to an application factory pattern [for same reasons you would use one in Flask](https://flask.palletsprojects.com/en/2.2.x/patterns/appfactories/). This also implies moving away from your current approach of using a config singleton that gets referenc",
                    "score": 28,
                    "author": "AnimalFarmPig"
                },
                {
                    "id": "j340t1g",
                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j340t1g/",
                    "text": "Upvoted because, on the face of it, it looks pretty cool, though I didn't get too far with it.  Have you considered making it a GitHub template (since a template is what it is)?  I think it's easy to do, plus or minus your Google-fu.",
                    "score": 24,
                    "author": "JohnLockwood"
                },
                {
                    "id": "j366s93",
                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j366s93/",
                    "text": "This is great feedback. The factory pattern with dependency injection has a lot of benefits for a FastAPI project. (Although the session auto commit at the high level router function is something I disagree with, as it’s  a low level transaction, but that’s a minor gripe).\n\nI also use this in my tem",
                    "score": 9,
                    "author": "pcgamerwannabe"
                }
            ],
            "sources": [
                {
                    "id": "1047tdb",
                    "kind": "post",
                    "score": 354,
                    "author": "n1EzeR",
                    "created": "2023-01-05T19:33:28+00:00",
                    "preview": "Some people were searching my GitHub profile for project examples after reading the article on [FastAPI best practices](",
                    "comments": [
                        {
                            "id": "j359kbe",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j359kbe/",
                            "body": "I’m new to Python and didn’t understand a single bullet point. So much to learn!\n\n(If anyone is able to break down the bullets to be newb friendly, it would be much appreciated)",
                            "depth": 0,
                            "score": 58,
                            "author": "XMACROSSD",
                            "replies": [
                                {
                                    "id": "j36wyr1",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36wyr1/",
                                    "body": "Holy shit, your comment made me realise I'm actually not a beginner any more!!\n\nQuick simple explanations:\n\nGunicorn - lets python talk to web servers\n\nDocker - containerising everything so you don't have to reinstall absolutely every little package to use it on a new system/computer (all you need is docker).\n\nJSON - Javascript Object Notation, a file format, looks very similar to python, used everywhere. Doesnt necessarily have to be used with JavaScript, its just a syntax thing for text files.\n\nlogs - we want to log every important decision that happens after we deploy, and keep a trackable record of it. Logging is the usual python package for this \n\nSentry - not used this, but envs or environments can be thought of as your application's configuration and settings\n\nPostgreSQL - the SQL database, stores all the data on the server. PostgreSQL is the SQL language variant, but you can use others, like SQLite, MySQL etc. They all do similar stuff, ane the languages themselves look similar. Note that SQL is not a general purpose language - it is only for databases. Also note, databases are not boring, they literally are the data, so getting the structure (schema) right is a must. Also your data will likely oulast your program.\n\nRedis - sort of like a database cache/data store, but in memory and on your disk instead of on the server. Works to speed things up for your user.\n\nBlack - code formatter, makes python look pretty. Doesn't allow you to customise how you want it formatted - which is useful for stopping pointless arguments between devs about whether or not you should put spaces after commas in function calls etc.\n\nOther alternatives are autoPep8 (probably the default formatter) and YAPF (now defunct? But customisable).\n\nPep8 is like a huge list of official python style and logical rules that you should follow. Code that follows pep8 is said to be as pep8 compliant\n\nFlake8 - code linter, checks your code for logical inconsistencies, python types and unused imports and stuff. Ensures your code conforms to Pep8\n\nisort - orders your imports\n\nMyPy - python type checking validation\n\n(Black, Flake8, isort and MyPy are important to have set up so that your code is easy to read and consistently has good style. Very important for coding as a team)\n\nPytest - unit test framework, ~~better~~ more elegant than unittest. If you dont know what unit tests are then you should learn (to obey the testing goat).\n\nAsyncio/async-test-client - complicated asynchronous shit, async test client helps you unit test async code, which is annoying af to test. Asynchronous coding is not quite like any other coding, it's like saying \"this task may take a while, lets do something else so we're not blocked in the meantime\". Debugging async code gets very difficult because the execution path might not be the same every time you run it.\n\nSQLAlchemy - write and interact with python classes (called models) instead of writing annoying SQL code. This also means you can write python and easily plug that into any SQL language variant you want. E.g. ou might start a demo project with SQLite, and change to postgres when it gets too big to be a demo anymore.\n\nAlembic - upgrades (and downgrades) the structure (schema) of your (Postgres) database so that the actual database and its data matches what your SQLAlchemy models say they are. It writes automatically version files which are python that will align with the changes you made to your models at different points, and it will them convert those version files into the relevant SQL code and run it on your database for you.\n\nJWT authorisation - ~~forget what the J is, but~~ JSON Web Token (cheers u/Fatvod) authorisation, which is like a secret key to ensure your users are who they say they are. JWT is better than other methods I think?\n\nPydantic: a very useful library that uses python type hinting syntax to perform validation on the data. Very elegant.\n\nFastAPI - the web application framework. Built off of pydantic. Competitors are Flask and Django, but FastAPI is becoming more popular. Django has its own version of SQLAlchemy and Alembic built in.",
                                    "depth": 1,
                                    "score": 36,
                                    "author": "Backlists",
                                    "replies": [
                                        {
                                            "id": "j376qtu",
                                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j376qtu/",
                                            "body": "As a long time beginner, thank you!",
                                            "depth": 2,
                                            "score": 6,
                                            "author": "tdn",
                                            "replies": [],
                                            "created_utc": "2023-01-06T14:50:58+00:00"
                                        },
                                        {
                                            "id": "jn3lru5",
                                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/jn3lru5/",
                                            "body": "Respect.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "chaoticneutron",
                                            "replies": [],
                                            "created_utc": "2023-06-06T09:41:44+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-01-06T13:38:38+00:00"
                                },
                                {
                                    "id": "j37kq1h",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j37kq1h/",
                                    "body": "If you're new to Python don't start with writing APIs 🤣",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "Salt_Worry1253",
                                    "replies": [
                                        {
                                            "id": "j4b3qhg",
                                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j4b3qhg/",
                                            "body": "I disagree.  I've got well over 20 years programming experience and when I started in Python I think apis were the BEST way to start.\n\nAs an experienced developer, I wanted to learn the ins and outs of python itself.  For me, the simplest thing was to spin up a Flask app and start writing code to respond to hits.\n\nI learned parsing, mapping, datatypes, loops, conditionals, how to import code from other files so everything wasn't all in one file.  Etc.\n\nAll without having to worry about GUIs or spend much time with the command line.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "oldWorshipper",
                                            "replies": [
                                                {
                                                    "id": "j5jyym7",
                                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j5jyym7/",
                                                    "body": "Note, you had 20 years experience as a programmer. It's quite likely OP is new to programming.",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "Salt_Worry1253",
                                                    "replies": [
                                                        {
                                                            "id": "j5li8vq",
                                                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j5li8vq/",
                                                            "body": "Fair enough.  Reading it again now, your take on OP's situation is probably more correct than mine.",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "oldWorshipper",
                                                            "replies": [],
                                                            "created_utc": "2023-01-23T21:19:58+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2023-01-23T15:33:08+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-01-14T13:13:20+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-01-06T16:20:31+00:00"
                                }
                            ],
                            "created_utc": "2023-01-06T03:07:24+00:00"
                        },
                        {
                            "id": "j35v9yn",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j35v9yn/",
                            "body": "You should consider moving from an app singleton to an application factory pattern [for same reasons you would use one in Flask](https://flask.palletsprojects.com/en/2.2.x/patterns/appfactories/). This also implies moving away from your current approach of using a config singleton that gets referenced wherever you feel like (ex. in your database module, where you set up a singleton for database access). Instead, what you should aim for is to have the app factory that accepts a setting instance and does all relevant configuration in the factory. This will make it easier to dynamically generate settings in Python code, ex. at test time, and make it easier to understand how your application is configured.\n\nI notice that you don't explicitly use any database transactions (at least not in the service layer code for the auth module). I assume this means that the `databases` module is set up to autocommit? Although, [based on the library documentation](https://www.encode.io/databases/tests_and_migrations/) maybe not? \n\nAn approach I've found to work well is to use sqlalchemy's connection and session management. I build a session factory when the application is being created (via the app factory), and then use FastAPI's dependency system to get a session for endpoint that need to access the database. It looks something like--\n\n\t@router.post(\"/\", response_model=schemas.ThingRecord)\n\tdef create_thing(\n\t    thing_payload: schemas.ThingCreationPayload,\n\t    session: db.Session = fastapi.Depends(db.session),\n\t) -> schemas.ThingRecord:\n\t    \"\"\"\n\t    Create a thing\n\t    \"\"\"\n\t    thing_record = service.thing.create_thing(session, thing_payload)\n\t    session.commit()\n\t    return thing_record\n\nNote that fetching the session and committing the transaction happens in the endpoint code while doing things in the database all happens in the service layer code. This makes it easier to compose operations in the service layer without needing to worry about transaction scope (as one would need to if transactions were handled in the service layer). It is possible to set up the session to commit automatically after the request scope completes, (which would make the code above just `return create_thing(...)`) but I prefer to be explicit.",
                            "depth": 0,
                            "score": 28,
                            "author": "AnimalFarmPig",
                            "replies": [
                                {
                                    "id": "j366s93",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j366s93/",
                                    "body": "This is great feedback. The factory pattern with dependency injection has a lot of benefits for a FastAPI project. (Although the session auto commit at the high level router function is something I disagree with, as it’s  a low level transaction, but that’s a minor gripe).\n\nI also use this in my template but unfortunately my templates has become a bit outdated with python 3.10 and 3.11 and all the changes to libraries like SQLAlchemy. So I am looking to update it significantly.\n\nWould be great to have a combination of OPs with this pattern and a proper database module, with separation of concern between DAOs and models, as well as between views/routes and database access logic.",
                                    "depth": 1,
                                    "score": 9,
                                    "author": "pcgamerwannabe",
                                    "replies": [],
                                    "created_utc": "2023-01-06T08:35:40+00:00"
                                },
                                {
                                    "id": "j368p6o",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j368p6o/",
                                    "body": "Yep, `databases` commits immediately right after executing the query. \n\nThe link you have provided describes auto rollbacks, not auto commits. The difference is that transactions are reverted after the database connection is disconnected, instead of not being executed on DB before the commit.\n\nIf I were to use it with `Session`s like yours, I think I wouldn't commit on the router level, but within the service, since it feels to me like mixing of different abstraction levels.\n\nI agree the idea of app factories is cool and we use it on projects with a more complex structure.\n\nThanks!",
                                    "depth": 1,
                                    "score": 4,
                                    "author": "n1EzeR",
                                    "replies": [
                                        {
                                            "id": "j36ffji",
                                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36ffji/",
                                            "body": "Committing at the service layer can quickly become messy though in my experience unless your services never call each other. If they do you'll have to start passing `skipCommit/doCommit` style params around or some other hacky things, to make sure the commit only happens at the end.",
                                            "depth": 2,
                                            "score": 3,
                                            "author": "Kruptein",
                                            "replies": [
                                                {
                                                    "id": "j36n5wu",
                                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36n5wu/",
                                                    "body": "Well, I try to keep services as separate and thin as possible, and the only case I combine them is when I need a higher level of abstraction within a database transaction.\n\n```python3\nasync def _create_user():\n  \"\"\"DB call to create user\"\"\"\n\nasync def _create_profile():\n  \"\"\"DB call to create user's profile\"\"\"\n\nasync def create_user():\n  async with db.transaction():\n    await _create_user()\n    await _create_profile()\n```",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "n1EzeR",
                                                    "replies": [],
                                                    "created_utc": "2023-01-06T12:07:30+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-01-06T10:34:01+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-01-06T09:01:25+00:00"
                                }
                            ],
                            "created_utc": "2023-01-06T06:15:43+00:00"
                        },
                        {
                            "id": "j340t1g",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j340t1g/",
                            "body": "Upvoted because, on the face of it, it looks pretty cool, though I didn't get too far with it.  Have you considered making it a GitHub template (since a template is what it is)?  I think it's easy to do, plus or minus your Google-fu.",
                            "depth": 0,
                            "score": 24,
                            "author": "JohnLockwood",
                            "replies": [
                                {
                                    "id": "j35d9p0",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j35d9p0/",
                                    "body": "Hey, I think I've got your point about not getting too far with the project example. That's something I can work with in the future posts.\n\nGH templates are very nice, thank you.",
                                    "depth": 1,
                                    "score": 5,
                                    "author": "n1EzeR",
                                    "replies": [
                                        {
                                            "id": "j36qbld",
                                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36qbld/",
                                            "body": "You can also have a look at cookiecutter FYI",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "adesme",
                                            "replies": [],
                                            "created_utc": "2023-01-06T12:39:39+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-01-06T03:35:11+00:00"
                                }
                            ],
                            "created_utc": "2023-01-05T22:09:26+00:00"
                        },
                        {
                            "id": "j35u979",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j35u979/",
                            "body": "What’s the reason for not hashing the refresh tokens in the database? They’re effectively a password in most services, and at risk of being used if the database is breached. \n\nThanks fully with the access token/JWT and a refresh token, the cost for checking the bcrypt hash only has to be paid on refresh, a rare occurrence. Better than if only a long lived API token is used. I’ve done similar things with sessions + refresh token.",
                            "depth": 0,
                            "score": 5,
                            "author": "redatheist",
                            "replies": [
                                {
                                    "id": "j36og5s",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36og5s/",
                                    "body": "That's a really good idea.\n\nThe only way to protect the refresh tokens we used was to fingerprint each user at the client level and validate every token refresh attempt with the user's initial fingerprint they had when receiving that token.",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "n1EzeR",
                                    "replies": [],
                                    "created_utc": "2023-01-06T12:21:04+00:00"
                                }
                            ],
                            "created_utc": "2023-01-06T06:04:57+00:00"
                        },
                        {
                            "id": "j369c4b",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j369c4b/",
                            "body": "If you're using Kubernetes in production it's probably best not to use gunicorn. Handling replication on the cluster level includes benefits like load balancing, etc. So having a single uvicorn process per pod is the best practice here.\n\nThere's a whole chapter on it in the fastapi documentation: https://fastapi.tiangolo.com/deployment/docker/#replication-number-of-processes",
                            "depth": 0,
                            "score": 6,
                            "author": "Rico42424",
                            "replies": [],
                            "created_utc": "2023-01-06T09:10:08+00:00"
                        },
                        {
                            "id": "j35cfz9",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j35cfz9/",
                            "body": "You run docker compose in production?",
                            "depth": 0,
                            "score": 3,
                            "author": "Devout--Atheist",
                            "replies": [
                                {
                                    "id": "j35e161",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j35e161/",
                                    "body": "Well, some people do and it's totally fine for them, but this template includes compose file for local development only.\n\nFor production, I have made a separate Dockerfile (\\`Dockerfile.prod\\`) to use. The difference is small though - installed packages and workers management.",
                                    "depth": 1,
                                    "score": 4,
                                    "author": "n1EzeR",
                                    "replies": [],
                                    "created_utc": "2023-01-06T03:40:54+00:00"
                                }
                            ],
                            "created_utc": "2023-01-06T03:28:53+00:00"
                        },
                        {
                            "id": "j35qukb",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j35qukb/",
                            "body": "I think you need some extra new lines in your OP. Formatting is whack on reddit",
                            "depth": 0,
                            "score": 3,
                            "author": "EquifaxCanEatMyAss",
                            "replies": [],
                            "created_utc": "2023-01-06T05:31:06+00:00"
                        },
                        {
                            "id": "j36657j",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36657j/",
                            "body": "I had one of these I used for a while but the evolution of sql alchemy and such broke it a bit, and the python packaging ecosystem moves fast. I’ll try this out for my next API, thanks for sharing.\n\nIf I find anything missing, I’ll contribute, as I had a full fledged template as well including migrations, auto tests, docs, etc.\n\nThe nice thing is it has services, web, front end, database access objects and models, application lifetime, database connection factory, default health check endpoint, etc.",
                            "depth": 0,
                            "score": 3,
                            "author": "pcgamerwannabe",
                            "replies": [],
                            "created_utc": "2023-01-06T08:27:01+00:00"
                        },
                        {
                            "id": "j36znev",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36znev/",
                            "body": "Similar setup here, minor differences:\n\n* ujson instead of orjson\n* using httpx instead of async-asgi-testclient for async test client\n* using ruff rather than any flake8 projects\n* unicorn instead of gunicorn\n* using pdm/pyproject.toml instead of pip\n* using opentelemetry for events/tracing",
                            "depth": 0,
                            "score": 3,
                            "author": "chub79",
                            "replies": [
                                {
                                    "id": "j38oyhk",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j38oyhk/",
                                    "body": "This comment has been overwritten.",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "Toph_is_bad_ass",
                                    "replies": [
                                        {
                                            "id": "j3vdhg5",
                                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j3vdhg5/",
                                            "body": "Hey. After your comment, I decided to look at orjson again. Indeed, it seems it does everything ujson did and more so I did the switch :) Thanks for the heads up! Have a good day :)",
                                            "depth": 2,
                                            "score": 3,
                                            "author": "chub79",
                                            "replies": [
                                                {
                                                    "id": "j3zxing",
                                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j3zxing/",
                                                    "body": "This comment has been overwritten.",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "Toph_is_bad_ass",
                                                    "replies": [],
                                                    "created_utc": "2023-01-12T05:11:05+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-01-11T08:59:35+00:00"
                                        },
                                        {
                                            "id": "j3br290",
                                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j3br290/",
                                            "body": "Not sure I have a why. It just works well for my use case.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "chub79",
                                            "replies": [],
                                            "created_utc": "2023-01-07T12:26:31+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-01-06T20:23:08+00:00"
                                }
                            ],
                            "created_utc": "2023-01-06T13:59:35+00:00"
                        },
                        {
                            "id": "j35fpba",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j35fpba/",
                            "body": "I did the same a few months ago. Comes with some nice bells and whistles https://github.com/nickatnight/fastapi-backend-base",
                            "depth": 0,
                            "score": 2,
                            "author": "betazoid_one",
                            "replies": [],
                            "created_utc": "2023-01-06T03:53:40+00:00"
                        },
                        {
                            "id": "j36duk9",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36duk9/",
                            "body": "Kind of curious how Alembic goes for you guys. I've _really liked_ Django's migration system. When I used SQLAlchemy, I didn't use Alembic, because I found it too complex and it errored out on columns from SQLAlchemy-Utils.\n\nHas it gotten good with third party tools like SQLAlchemy-Utils?",
                            "depth": 0,
                            "score": 2,
                            "author": "ExternalUserError",
                            "replies": [
                                {
                                    "id": "j36p2gq",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36p2gq/",
                                    "body": "Never had an issue with SQLAlchemy-Utils & Alembic, so maybe it’s gotten better! I will say I prefer Alembic nowadays bc i feel like i get more control over it. But I had to use django’s orm recently and their migration system really impressed me for it’s ease of use!\n\n**edit** Flask-migrate is an interesting way of making alembic work similar to django orm. i wonder if anybody’s done anything similar for fastapi…",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "[deleted]",
                                    "replies": [],
                                    "created_utc": "2023-01-06T12:27:23+00:00"
                                },
                                {
                                    "id": "j37pwc0",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j37pwc0/",
                                    "body": "I don't like alembic for a lot of reasons but never found a better alternative when using SQLAlchemy (which like well enough for simple things), specifically the autogeneration is reasonably good though I'd never trust it 100%.  My biggest beef with alembic:\n\n1. They tried to build a revision system like git has, while I understand maybe why they'd want to? It's absolutely unnecessary for what you need out of a library like this.\n2. The update scripts have the worst naming conventions, out of the box they don't sequentially sort\n3. The table used by alembic to track the migrations does not record the full history of applied migrations, just the last.  The history should be kept for auditing purposes and debugging.",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "GraphicH",
                                    "replies": [
                                        {
                                            "id": "j3d3adx",
                                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j3d3adx/",
                                            "body": "I don’t know a whole lot about webdev in prod (I do data engineering), but wouldn’t you want a revision system for migrations so you’d be able to downgrade your database while keeping newer code? Or is that not really a use case / thing people do?",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "alexisprince",
                                            "replies": [
                                                {
                                                    "id": "j3ebced",
                                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j3ebced/",
                                                    "body": "I don't have a problem with a revision system, flyway which I mentioned in another comment has it.   I mean they tried to re-implement the complex, distributed revision system that git has.  Its overkill for this, and unnecessary, I mean there's a whole process for \"merging\" two revisions with the same 'head', and 100% of the time this has happened on my team its just picking one to run before the other, there's literally no point to it.  Its classic over-engineering.",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "GraphicH",
                                                    "replies": [],
                                                    "created_utc": "2023-01-07T23:26:45+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-01-07T18:33:45+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-01-06T16:52:11+00:00"
                                },
                                {
                                    "id": "j36pbrm",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36pbrm/",
                                    "body": "Django's migration system is superior to every other system I've ever used, including sqlalchemy+Alembic.",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "Ran4",
                                    "replies": [],
                                    "created_utc": "2023-01-06T12:29:56+00:00"
                                }
                            ],
                            "created_utc": "2023-01-06T10:12:12+00:00"
                        },
                        {
                            "id": "j37df1j",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j37df1j/",
                            "body": "If you want it to be reusable, consider making it a [cookie cutter](https://cookiecutter.readthedocs.io/en/stable/) template.\n\nThis guarantees that when you start a new project using your template you won't forget to change something somewhere.",
                            "depth": 0,
                            "score": 2,
                            "author": "Daerdemandt",
                            "replies": [],
                            "created_utc": "2023-01-06T15:34:56+00:00"
                        },
                        {
                            "id": "j34tr34",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j34tr34/",
                            "body": "Now stick traefik in front. For the life of me, I can't get a simple traefik setup with let's encrypt that has a simple non www to www redirect.\n\nSome useful stuff here like the sqlalchemy stubbs. Thanks!",
                            "depth": 0,
                            "score": 4,
                            "author": "cianuro",
                            "replies": [],
                            "created_utc": "2023-01-06T01:16:11+00:00"
                        },
                        {
                            "id": "j36ikfo",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36ikfo/",
                            "body": "OP, if you could add a newline before each bullet, that would greatly inprove formatting on mobile, as it basically all runs together without linebreaks as-is.",
                            "depth": 0,
                            "score": 1,
                            "author": "lavahot",
                            "replies": [
                                {
                                    "id": "j36nsz5",
                                    "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j36nsz5/",
                                    "body": "Done, though I'm not sure how to test it, since was ok on my iOS app and mobile browser.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "n1EzeR",
                                    "replies": [
                                        {
                                            "id": "j38ijlu",
                                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j38ijlu/",
                                            "body": "Much better, thank you!",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "lavahot",
                                            "replies": [],
                                            "created_utc": "2023-01-06T19:44:04+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-01-06T12:14:20+00:00"
                                }
                            ],
                            "created_utc": "2023-01-06T11:15:01+00:00"
                        },
                        {
                            "id": "j37p9q9",
                            "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j37p9q9/",
                            "body": ">migrations set in easy to sort format (YYYY-MM-DD\\_slug)\n\nFor the life of me I have no idea why this is not just the default in alembic.  I've used other db migrations like flyway in JVM land, and it just makes sense that your migration scripts should be ordered first -> last.",
                            "depth": 0,
                            "score": 1,
                            "author": "GraphicH",
                            "replies": [],
                            "created_utc": "2023-01-06T16:48:24+00:00"
                        }
                    ],
                    "permalink": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/"
                }
            ],
            "summary": "Users discuss production deployment best practices for FastAPI, focusing on Docker optimization, logging, error monitoring, and infrastructure setup. Key themes include using non-root users in Docker, JSON logging, Sentry for error tracking, and the application factory pattern for better configuration management.",
            "sentiment": "neutral",
            "pain_points": [
                {
                    "type": "technical",
                    "issue": "Security vulnerabilities from running containers as root",
                    "description": "Running Docker containers as root user poses security risks in production environments",
                    "example_quote": {
                        "id": null,
                        "url": null,
                        "text": "production-ready - gunicorn with dynamic workers configuration (stolen from @tiangolo) - Dockerfile optimized for small size and fast builds with a non-root user",
                        "score": null,
                        "author": null
                    },
                    "system_actions": [
                        {
                            "title": "Implement container security best practices",
                            "validation": "Prevents privilege escalation attacks and follows security compliance standards",
                            "recommendation": "Create Dockerfile with USER directive and minimal package installation",
                            "proposed_solution": "Add non-root user to Dockerfile with proper permissions"
                        }
                    ],
                    "why_this_is_pain": "Root access can lead to system compromise if container is breached, exposing all application data and infrastructure",
                    "user_suggested_solutions": [
                        {
                            "solution": "Implement non-root user in Dockerfile",
                            "example_quote": {
                                "id": "1047tdb",
                                "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/",
                                "text": "Dockerfile optimized for small size and fast builds with a non-root user",
                                "score": 354,
                                "author": "n1EzeR"
                            }
                        }
                    ]
                },
                {
                    "type": "technical",
                    "issue": "Inconsistent logging and error monitoring",
                    "description": "Lack of centralized logging and error tracking makes debugging production issues difficult",
                    "example_quote": {
                        "id": null,
                        "url": null,
                        "text": "JSON logs - we want to log every important decision that happens after we deploy, and keep a trackable record of it. Logging is the usual python package for this",
                        "score": null,
                        "author": null
                    },
                    "system_actions": [
                        {
                            "title": "Implement centralized logging solution",
                            "validation": "Enables faster debugging and audit trail for compliance",
                            "recommendation": "Integrate Sentry for error tracking and JSON formatting for log consistency",
                            "proposed_solution": "Set up structured JSON logging with log aggregation"
                        }
                    ],
                    "why_this_is_pain": "Without proper logging, identifying root causes of failures becomes time-consuming and error-prone",
                    "user_suggested_solutions": [
                        {
                            "solution": "Implement structured JSON logging",
                            "example_quote": {
                                "id": null,
                                "url": null,
                                "text": "JSON logs - we want to log every important decision that happens after we deploy, and keep a trackable record of it",
                                "score": null,
                                "author": null
                            }
                        }
                    ]
                },
                {
                    "type": "technical",
                    "issue": "Complex database transaction management",
                    "description": "Difficulty managing database sessions and transactions across different layers of the application",
                    "example_quote": {
                        "id": "j35v9yn",
                        "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j35v9yn/",
                        "text": "I build a session factory when the application is being created (via the app factory), and then use FastAPI's dependency system to get a session for endpoint that need to access the database",
                        "score": 28,
                        "author": "AnimalFarmPig"
                    },
                    "system_actions": [
                        {
                            "title": "Refactor to application factory pattern",
                            "validation": "Improves code organization and makes testing easier",
                            "recommendation": "Create database module with session factory and dependency injection",
                            "proposed_solution": "Implement factory pattern with proper session management"
                        }
                    ],
                    "why_this_is_pain": "Improper transaction handling can lead to data inconsistency and performance issues",
                    "user_suggested_solutions": [
                        {
                            "solution": "Implement application factory pattern with dependency injection",
                            "example_quote": {
                                "id": "j35v9yn",
                                "url": "https://reddit.com/r/Python/comments/1047tdb/the_way_i_build_new_fastapi_projects/j35v9yn/",
                                "text": "use FastAPI's dependency system to get a session for endpoint that need to access the database",
                                "score": 28,
                                "author": "AnimalFarmPig"
                            }
                        }
                    ]
                }
            ],
            "signal_count": 24,
            "relevance_score": 95,
            "brands_mentioned": [
                "FastAPI",
                "Docker",
                "Sentry",
                "PostgreSQL"
            ],
            "demographic_signals": [
                "Developers",
                "Backend Engineers",
                "DevOps Engineers"
            ]
        },
        {
            "id": "theme_3",
            "title": "Database and Infrastructure Choices",
            "quotes": [
                {
                    "id": "n7hq5ab",
                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hq5ab/",
                    "text": "Surprisingly, it is MUCH faster then Claude Code and it is MUCH cheaper (\\~3-5x cheaper in total).",
                    "score": 27,
                    "author": "AnalystAI"
                },
                {
                    "id": "n7hugmx",
                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hugmx/",
                    "text": "We're gonna need a subreddit for using ChatGPT for coding. Oh wait..",
                    "score": 17,
                    "author": "apf6"
                },
                {
                    "id": "n7hlgvj",
                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hlgvj/",
                    "text": "I'm willing to give it a go. Claude Code was so good last month, if it can get near that then I'm a happy chappy.",
                    "score": 15,
                    "author": "NicholasAnsThirty"
                },
                {
                    "id": "n7intjc",
                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7intjc/",
                    "text": "it basically fixed most of my buggy code. it is pretty good ngl",
                    "score": 7,
                    "author": "SnooBunnies7313"
                },
                {
                    "id": "n7lzzh4",
                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lzzh4/",
                    "text": "    I agree tbh. \n    \n    Try this. I forked gemini-cli made it mulit-provider and added claude-style todo lists. Works great with GPT-5.\n    \n    https://github.com/acoliver/llxprt-code\n    npm install -g @vybestack/llxprt-code",
                    "score": 6,
                    "author": "acoliver"
                }
            ],
            "sources": [
                {
                    "id": "1mkbkiv",
                    "kind": "post",
                    "score": 124,
                    "author": "AnalystAI",
                    "created": "2025-08-07T20:46:40+00:00",
                    "preview": "In the past OpenAI models were not good enough for vibe-coding. I preferred Claude Code with Sonnet 4. \n\nAfter the prese",
                    "comments": [
                        {
                            "id": "n7hlgvj",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hlgvj/",
                            "body": "I'm willing to give it a go. Claude Code was so good last month, if it can get near that then I'm a happy chappy.",
                            "depth": 0,
                            "score": 15,
                            "author": "NicholasAnsThirty",
                            "replies": [],
                            "created_utc": "2025-08-07T21:05:50+00:00"
                        },
                        {
                            "id": "n7hq5ab",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hq5ab/",
                            "body": "Surprisingly, it is MUCH faster then Claude Code and it is MUCH cheaper (\\~3-5x cheaper in total).",
                            "depth": 0,
                            "score": 27,
                            "author": "AnalystAI",
                            "replies": [
                                {
                                    "id": "n7yurbp",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7yurbp/",
                                    "body": "\n\nI logged in via \"OpenAI account\" not with API key. How can I verify I have selected a specific model?\n\nBecause it is accepting any model name like \"codex -m gpt-53333\".\n\nI asked \"What model you are using?\" and it replied \".... I’m an OpenAI G\n\nPT‑4‑class assistant ....\".",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "RageshAntony",
                                    "replies": [
                                        {
                                            "id": "nb6fkv8",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/nb6fkv8/",
                                            "body": "The \\`/status\\` command will show that info. Also, you can select a model with the \\`/model\\` command. Just type these in as if they would prompts.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "istvan-ujjmeszaros",
                                            "replies": [],
                                            "created_utc": "2025-08-28T18:29:38+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-10T17:03:32+00:00"
                                },
                                {
                                    "id": "n7lzpnz",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lzpnz/",
                                    "body": "Um.. You still pay by the token. I think it might be cheaper by the token but not against a max subscription.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "acoliver",
                                    "replies": [
                                        {
                                            "id": "n7qnwhf",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7qnwhf/",
                                            "body": "You can use your ChatGPT subscription with cli Codex now.",
                                            "depth": 2,
                                            "score": 5,
                                            "author": "leynosncs",
                                            "replies": [],
                                            "created_utc": "2025-08-09T07:09:35+00:00"
                                        },
                                        {
                                            "id": "n7maykb",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7maykb/",
                                            "body": "https://old.reddit.com/r/ChatGPTCoding/comments/1mk9do4/you_can_now_use_your_pluspro_for_codex_cli/\n\nHave not used GPT-5 much but had one issue that Claude was derping a bit not able to figure it out and GPT fixed. I guess verdict still out on what I prefer generally (and from the 4.1 Opus post it sounds like 5.0 might be coming in a few weeks?) but definitely wort trying out.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "relderpaway",
                                            "replies": [],
                                            "created_utc": "2025-08-08T15:45:12+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T14:52:03+00:00"
                                }
                            ],
                            "created_utc": "2025-08-07T21:29:40+00:00"
                        },
                        {
                            "id": "n7intjc",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7intjc/",
                            "body": "it basically fixed most of my buggy code. it is pretty good ngl",
                            "depth": 0,
                            "score": 7,
                            "author": "SnooBunnies7313",
                            "replies": [],
                            "created_utc": "2025-08-08T00:38:19+00:00"
                        },
                        {
                            "id": "n7hugmx",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hugmx/",
                            "body": "We're gonna need a subreddit for using ChatGPT for coding. Oh wait..",
                            "depth": 0,
                            "score": 17,
                            "author": "apf6",
                            "replies": [],
                            "created_utc": "2025-08-07T21:52:21+00:00"
                        },
                        {
                            "id": "n7j3ltk",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j3ltk/",
                            "body": "For those who have tested in would GPT-5 in Codex be more similar to Opus or Sonnet?\n\nEqually, I'd be interested in any real world feedback on how well it handles context. I know it has a larger context window than Claude Code, but Claude Code is generally very good at pulling the correct files or parts of files into its context in order to solve problems. Is Codex just as good?",
                            "depth": 0,
                            "score": 5,
                            "author": "paul-towers",
                            "replies": [
                                {
                                    "id": "n7l4qyy",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l4qyy/",
                                    "body": "Codex is too far behind competitors atm",
                                    "depth": 1,
                                    "score": 5,
                                    "author": "Still-Ad3045",
                                    "replies": [
                                        {
                                            "id": "n7lzzh4",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lzzh4/",
                                            "body": "    I agree tbh. \n    \n    Try this. I forked gemini-cli made it mulit-provider and added claude-style todo lists. Works great with GPT-5.\n    \n    https://github.com/acoliver/llxprt-code\n    npm install -g @vybestack/llxprt-code",
                                            "depth": 2,
                                            "score": 6,
                                            "author": "acoliver",
                                            "replies": [
                                                {
                                                    "id": "n7urolh",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7urolh/",
                                                    "body": "You, are badass. This tool compliments that, and I appreciate you for sending it here. Thank you!",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "pop-lock",
                                                    "replies": [],
                                                    "created_utc": "2025-08-09T23:20:08+00:00"
                                                },
                                                {
                                                    "id": "n8145zz",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n8145zz/",
                                                    "body": "very sexy, I will likely turn this into an MCP server by forking my own [gemini-mcp-tool](https://github.com/jamubc/gemini-mcp-tool)",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "Still-Ad3045",
                                                    "replies": [
                                                        {
                                                            "id": "n817qyu",
                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n817qyu/",
                                                            "body": "Do it. Once their github actions stabilize, I'll have that too.  Ask any model anywhere anytime. I like it.",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "acoliver",
                                                            "replies": [
                                                                {
                                                                    "id": "n819ptz",
                                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n819ptz/",
                                                                    "body": "!remind me 4 days \n\nGot an exam coming up but after that I’ll be happy to :)",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "Still-Ad3045",
                                                                    "replies": [
                                                                        {
                                                                            "id": "n819tzf",
                                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n819tzf/",
                                                                            "body": "I will be messaging you in 4 days on [**2025-08-15 01:01:11 UTC**](http://www.wolframalpha.com/input/?i=2025-08-15%2001:01:11%20UTC%20To%20Local%20Time) to remind you of [**this link**](https://www.reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n819ptz/?context=3)\n\n[**CLICK THIS LINK**](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=Reminder&message=%5Bhttps%3A%2F%2Fwww.reddit.com%2Fr%2FChatGPTCoding%2Fcomments%2F1mkbkiv%2Fgpt5_in_openai_codex_is_great%2Fn819ptz%2F%5D%0A%0ARemindMe%21%202025-08-15%2001%3A01%3A11%20UTC) to send a PM to also be reminded and to reduce spam.\n\n^(Parent commenter can ) [^(delete this message to hide from others.)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=Delete%20Comment&message=Delete%21%201mkbkiv)\n\n*****\n\n|[^(Info)](https://www.reddit.com/r/RemindMeBot/comments/e1bko7/remindmebot_info_v21/)|[^(Custom)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=Reminder&message=%5BLink%20or%20message%20inside%20square%20brackets%5D%0A%0ARemindMe%21%20Time%20period%20here)|[^(Your Reminders)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=List%20Of%20Reminders&message=MyReminders%21)|[^(Feedback)](https://www.reddit.com/message/compose/?to=Watchful1&subject=RemindMeBot%20Feedback)|\n|-|-|-|-|",
                                                                            "depth": 6,
                                                                            "score": 1,
                                                                            "author": "RemindMeBot",
                                                                            "replies": [],
                                                                            "created_utc": "2025-08-11T01:01:54+00:00"
                                                                        },
                                                                        {
                                                                            "id": "n9fdhia",
                                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n9fdhia/",
                                                                            "body": "You make any progress on this? That would be sick af",
                                                                            "depth": 6,
                                                                            "score": 1,
                                                                            "author": "AreWeNotDoinPhrasing",
                                                                            "replies": [],
                                                                            "created_utc": "2025-08-18T22:05:44+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2025-08-11T01:01:11+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2025-08-11T00:49:10+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-08-11T00:27:12+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-08T14:53:20+00:00"
                                        },
                                        {
                                            "id": "n8e5y4k",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n8e5y4k/",
                                            "body": "In what ways?  I was using sonnet and opus because GPT was trash for my needs, but Codex seems to have cut down in compiler errors SIGNIFICANTLY.  I just started using it today tho.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "modernDayKing",
                                            "replies": [],
                                            "created_utc": "2025-08-13T01:25:17+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T12:05:00+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T02:12:59+00:00"
                        },
                        {
                            "id": "n7hkch5",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hkch5/",
                            "body": "Read my mind friend. Diving in!",
                            "depth": 0,
                            "score": 3,
                            "author": "kcabrams",
                            "replies": [],
                            "created_utc": "2025-08-07T21:00:14+00:00"
                        },
                        {
                            "id": "n7j15gu",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j15gu/",
                            "body": "Well, it seems at least on par with Claude. Gonna cancel my CC  Max next month, since I have pro already.",
                            "depth": 0,
                            "score": 3,
                            "author": "Freed4ever",
                            "replies": [],
                            "created_utc": "2025-08-08T01:57:57+00:00"
                        },
                        {
                            "id": "n7jok13",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7jok13/",
                            "body": "How much does it cost with API - say for an hour of hardcore coding? I feel like I’m using a lot with the Claude max and if I were to switch to API pricing I’d have to pay much more than 100 bucks a month which is my current plan. I definitely want to try codex now though",
                            "depth": 0,
                            "score": 3,
                            "author": "Reasonable_Ad_4930",
                            "replies": [
                                {
                                    "id": "n7mr49r",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7mr49r/",
                                    "body": "Yesterday for 2 hours of intensive vibe coding I payed 1.2 USD. Usually for similar work I pay to Claude 5 USD for Sonnet. For Opus it will cost fortune. Quality of gpt-5 in coding is definitely higher than Opus. So I have made my choice.",
                                    "depth": 1,
                                    "score": 4,
                                    "author": "AnalystAI",
                                    "replies": [],
                                    "created_utc": "2025-08-08T17:01:54+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T04:35:47+00:00"
                        },
                        {
                            "id": "n7k4l1b",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7k4l1b/",
                            "body": "Interesting, Claude code is included in my monthly subscription. Not sure if they include it in ChatGPT pro subs, if they do, then it will be a no-brainer, it's a really good model, and OpenAI offers way more in terms of images and voice apis.",
                            "depth": 0,
                            "score": 3,
                            "author": "[deleted]",
                            "replies": [
                                {
                                    "id": "n7k7xvs",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7k7xvs/",
                                    "body": "As of today, you can use your ChatGPT account for credits!",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "gpeal",
                                    "replies": [],
                                    "created_utc": "2025-08-08T07:21:44+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T06:51:25+00:00"
                        },
                        {
                            "id": "n7l4nbd",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l4nbd/",
                            "body": "how long before the rest of the already open source, free and paid features that have existed for months be added as a value adding feature?",
                            "depth": 0,
                            "score": 3,
                            "author": "Still-Ad3045",
                            "replies": [
                                {
                                    "id": "n7lgcr1",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lgcr1/",
                                    "body": "Just as soon as legal ensures they can make a mint on it without getting sued.",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "LabGecko",
                                    "replies": [],
                                    "created_utc": "2025-08-08T13:13:34+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T12:04:20+00:00"
                        },
                        {
                            "id": "n7m4rt7",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7m4rt7/",
                            "body": "Can we use codex with plus",
                            "depth": 0,
                            "score": 3,
                            "author": "tradingtoolx",
                            "replies": [
                                {
                                    "id": "n7mc7i1",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7mc7i1/",
                                    "body": "Yes!",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "coylter",
                                    "replies": [],
                                    "created_utc": "2025-08-08T15:51:03+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T15:15:57+00:00"
                        },
                        {
                            "id": "n7hyg88",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hyg88/",
                            "body": "I wish codex integrated with gitlab as well as GitHub. I mean, I know I could also just have a sister origin to github but it’s annoying.",
                            "depth": 0,
                            "score": 4,
                            "author": "thunder-thumbs",
                            "replies": [
                                {
                                    "id": "n7l4vgu",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l4vgu/",
                                    "body": "yeah one day codex will reach the level of open source and paid options that haven been established for months.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Still-Ad3045",
                                    "replies": [],
                                    "created_utc": "2025-08-08T12:05:49+00:00"
                                },
                                {
                                    "id": "n7jw2pm",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7jw2pm/",
                                    "body": "Keep in mind Microsoft is a massive shareholder in OpenAI and also owns Github. ",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Frodolas",
                                    "replies": [],
                                    "created_utc": "2025-08-08T05:36:03+00:00"
                                },
                                {
                                    "id": "n7ioufh",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ioufh/",
                                    "body": "What is gitlab for? I’m looking but don’t understand. Played with codex for the first time just now, and it seems like iterating and testing would be somewhat less fluid than say claude code because it pushes changes to a fit instead of a live environment.",
                                    "depth": 1,
                                    "score": -4,
                                    "author": "dalhaze",
                                    "replies": [
                                        {
                                            "id": "n7ng44z",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ng44z/",
                                            "body": "Gitlab is a younger, sick brother of github. Some loves him out of misery.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "raiffuvar",
                                            "replies": [],
                                            "created_utc": "2025-08-08T19:01:12+00:00"
                                        },
                                        {
                                            "id": "n7ofhxn",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ofhxn/",
                                            "body": "a lot of enterprises prefer gitlab because it's all wrapped in a single cli/tool",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "ChiefExec",
                                            "replies": [],
                                            "created_utc": "2025-08-08T22:00:35+00:00"
                                        },
                                        {
                                            "id": "neu8m92",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/neu8m92/",
                                            "body": "Gitlab is usually picked for an on premise deployment.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "darksparkone",
                                            "replies": [],
                                            "created_utc": "2025-09-18T05:40:23+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T00:44:29+00:00"
                                }
                            ],
                            "created_utc": "2025-08-07T22:13:33+00:00"
                        },
                        {
                            "id": "n7irc03",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7irc03/",
                            "body": "Is codex CLI finally included in the Pro plan? Don’t know if they announced it today. ",
                            "depth": 0,
                            "score": 3,
                            "author": "jstanaway",
                            "replies": [
                                {
                                    "id": "n7j0xer",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j0xer/",
                                    "body": "Yes",
                                    "depth": 1,
                                    "score": 4,
                                    "author": "Freed4ever",
                                    "replies": [
                                        {
                                            "id": "n7jcsib",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7jcsib/",
                                            "body": "isn’t codex cloud version only ? plz explain don’t understand",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "passionate123",
                                            "replies": [
                                                {
                                                    "id": "n7jft58",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7jft58/",
                                                    "body": "Nope, there's a codex cli version as well, and in so far, it seems to be on par with CC, mind you, it's only been an hour playing with it. Search for OpenAI codex cli, you will find its Github repos with instructions",
                                                    "depth": 3,
                                                    "score": 4,
                                                    "author": "Freed4ever",
                                                    "replies": [
                                                        {
                                                            "id": "n7ji8km",
                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ji8km/",
                                                            "body": "thank you.. didn’t know that we can use codex cli with chatgpt subscription",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "passionate123",
                                                            "replies": [
                                                                {
                                                                    "id": "n7jj17b",
                                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7jj17b/",
                                                                    "body": "Well, that's new today.",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "Freed4ever",
                                                                    "replies": [],
                                                                    "created_utc": "2025-08-08T03:55:06+00:00"
                                                                },
                                                                {
                                                                    "id": "n7l2ppa",
                                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l2ppa/",
                                                                    "body": "Could you access?",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "Agitated_Thanks_879",
                                                                    "replies": [],
                                                                    "created_utc": "2025-08-08T11:51:06+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2025-08-08T03:49:29+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-08-08T03:32:23+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-08T03:11:52+00:00"
                                        },
                                        {
                                            "id": "n7k76of",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7k76of/",
                                            "body": "What are the limits?",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Singularity-42",
                                            "replies": [
                                                {
                                                    "id": "n7l5z3y",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l5z3y/",
                                                    "body": "It's unclear what the limit is. The only thing they say is pro should be able to use it for coding the whole 8hrs day, unless they run multiple windows/projects at the same time like a mad man.",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "Freed4ever",
                                                    "replies": [],
                                                    "created_utc": "2025-08-08T12:12:45+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-08T07:14:49+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T01:56:36+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T00:58:56+00:00"
                        },
                        {
                            "id": "n7kalmm",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7kalmm/",
                            "body": "just been using with my plus sub an used one of the example prompts from the openai git \"Carefully review this repo, and propose 3 high impact well-scoped PRs\"\n\nVery impressive outputs for my project. I also tested the same prompt in the same project using gemini 2.5 pro and CC just out pure curiosity of the outputs. As you'd expect, all totally different PR suggestions but all great considerations.\n\nI will say I hit the GPT5 limit via codex and my plus account pretty quickly, probably within an hour I'd say \"\n\n    7093324 tokens used   43% context left",
                            "depth": 0,
                            "score": 2,
                            "author": "christof21",
                            "replies": [],
                            "created_utc": "2025-08-08T07:47:04+00:00"
                        },
                        {
                            "id": "n7kiet8",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7kiet8/",
                            "body": "How are you specifying the model in Codex? I tried using codex -m and it doesn't recognize 5 as a valid model.",
                            "depth": 0,
                            "score": 2,
                            "author": "Snottord",
                            "replies": [
                                {
                                    "id": "n7l4euz",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l4euz/",
                                    "body": "Here's the format  \n  \ncodex -m gpt-5\n\nThis will show all your available models if your key is in $OPENAI\\_API\\_KEY:\n\ncurl -s -H \"Authorization: Bearer $OPENAI\\_API\\_KEY\" [https://api.openai.com/v1/models](https://api.openai.com/v1/models) | jq -r '.data\\[\\].id' | grep -Ev '\\[0-9\\]{4}-\\[0-9\\]{2}-\\[0-9\\]{2}' | sort -u",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "dndiyguy",
                                    "replies": [
                                        {
                                            "id": "n7lhadw",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lhadw/",
                                            "body": "Amazing. Thank you!",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "Snottord",
                                            "replies": [],
                                            "created_utc": "2025-08-08T13:18:41+00:00"
                                        },
                                        {
                                            "id": "n7yumsc",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7yumsc/",
                                            "body": "I logged in via \"OpenAI account\" not with API key. How can I verify I have selected a specific model? \n\nBecause it is accepting any model name like \"codex -m gpt-53333\". \n\nI asked \"What model you are using?\" and it replied \".... I’m an OpenAI G\n\nPT‑4‑class assistant ....\".",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "RageshAntony",
                                            "replies": [],
                                            "created_utc": "2025-08-10T17:02:53+00:00"
                                        },
                                        {
                                            "id": "n84wfp6",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n84wfp6/",
                                            "body": "Im puzzled. The curl command returned all the models, which means the api key is being loaded ok. Then I ran codex -m gpt-5 and the status showed:   \n/status  \nWorkspace  \nPath: \\~/Sites/anibal5/gg  \nApproval Mode: on-request\n\nSandbox: workspace-write  \nModel  \nName: gpt-5  \nProvider: OpenAI  \nReasoning Effort: Medium   \nReasoning Summaries: Auto\n\nToken Usage  \nInput: 0  \nOutput: 0  \nTotal: 0  \n  \nis it loading the api key? as Im keep getting this dreadfull error after a couple of seconds: 🖐 stream disconnected before completion: Rate limit reached for gpt-5 in organization org-FphMblahblahblabh on tokens per min (TPM): Limit 30000, Used 27833, Requested 10706. Please try again in 17.078s. Visit [https://platform.openai.com/account/rate-limits](https://platform.openai.com/account/rate-limits) to learn more.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "anibalin",
                                            "replies": [],
                                            "created_utc": "2025-08-11T16:33:48+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T12:02:45+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T09:02:14+00:00"
                        },
                        {
                            "id": "n7ksn9c",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ksn9c/",
                            "body": "This is maybe a stupid question but I can’t really figure it out after looking at the ChatGPT pricing page - is Codex included in the $20 ChatGPT plus plan? Or do you have to do Pro?",
                            "depth": 0,
                            "score": 2,
                            "author": "[deleted]",
                            "replies": [],
                            "created_utc": "2025-08-08T10:35:37+00:00"
                        },
                        {
                            "id": "n7nllzd",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7nllzd/",
                            "body": "With the new subscription-tier offering, I definitely need to check this out. I’m spending 8-10 hours a day with Claude Code Max 20x and *very* interested to try GPT5 head to head with their flat-rate plan.\n\nHas anyone done a head to head on the Codex versus Claude Code from the “CLI” standpoint (e.g. not a model to model comparison but a CLI feature comparison… can you use it like a Unix utility, does it putout stream-json, etc.)",
                            "depth": 0,
                            "score": 2,
                            "author": "lightsd",
                            "replies": [],
                            "created_utc": "2025-08-08T19:28:28+00:00"
                        },
                        {
                            "id": "n7p2c3x",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7p2c3x/",
                            "body": "Tried it today. It got stuck on some simple ESM issue. Seems a bit overly hyped.",
                            "depth": 0,
                            "score": 2,
                            "author": "nerdswithattitude",
                            "replies": [],
                            "created_utc": "2025-08-09T00:11:01+00:00"
                        },
                        {
                            "id": "n7ii0ij",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ii0ij/",
                            "body": "Just spent 1 hour with GPT-5 IN API LLM coding - Cline\n\n  \nIts good.",
                            "depth": 0,
                            "score": 2,
                            "author": "IamJustdoingit",
                            "replies": [],
                            "created_utc": "2025-08-08T00:04:02+00:00"
                        },
                        {
                            "id": "n7k8si0",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7k8si0/",
                            "body": "No screenshots lmao? I'll take this post as an ad then.",
                            "depth": 0,
                            "score": 1,
                            "author": "piponwa",
                            "replies": [],
                            "created_utc": "2025-08-08T07:29:49+00:00"
                        },
                        {
                            "id": "n7kslia",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7kslia/",
                            "body": "why is codex so awkward to set up compared to Claude Code? They could code a more CC-like approach to CLI coding in a day.",
                            "depth": 0,
                            "score": 1,
                            "author": "Competitive-Hat-5182",
                            "replies": [],
                            "created_utc": "2025-08-08T10:35:11+00:00"
                        },
                        {
                            "id": "n7lzjkh",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lzjkh/",
                            "body": "If you want a more claude-code like experience check out [https://github.com/acoliver/llxprt-code](https://github.com/acoliver/llxprt-code) .   \nI forked Gemini-Cli and made it multi-provider, added claude like todo lists and other features. Codex is great but sometimes you hit the wall with it and want more or at least I did. \n\n    npm install -g @vybestack/llxprt-code",
                            "depth": 0,
                            "score": 1,
                            "author": "acoliver",
                            "replies": [],
                            "created_utc": "2025-08-08T14:51:16+00:00"
                        },
                        {
                            "id": "n7ob7hj",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ob7hj/",
                            "body": "Since I’m a little bit new to the party, excuse me my silly questions. Vibe Coding means I connect my GitHub repo with OpenAI Codex, I am prompting my requirements for the software and Codex does the job?",
                            "depth": 0,
                            "score": 1,
                            "author": "highasthedn",
                            "replies": [],
                            "created_utc": "2025-08-08T21:37:32+00:00"
                        },
                        {
                            "id": "n7ohj2g",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ohj2g/",
                            "body": "The codex uses the gpt4-codex model not gpt5 although they could have updated it slightly",
                            "depth": 0,
                            "score": 1,
                            "author": "m3kw",
                            "replies": [],
                            "created_utc": "2025-08-08T22:11:54+00:00"
                        },
                        {
                            "id": "n7pkry7",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7pkry7/",
                            "body": "“It’s much better than Cats. I’m going to see it again and again”",
                            "depth": 0,
                            "score": 1,
                            "author": "marcopaulodirect",
                            "replies": [],
                            "created_utc": "2025-08-09T02:03:41+00:00"
                        },
                        {
                            "id": "n7rxwxy",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7rxwxy/",
                            "body": "actually they say they still use o3 in Codex  \n[https://platform.openai.com/docs/codex/overview](https://platform.openai.com/docs/codex/overview)",
                            "depth": 0,
                            "score": 1,
                            "author": "Randomizer667",
                            "replies": [
                                {
                                    "id": "n7s72g2",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7s72g2/",
                                    "body": "Codex says it is using GPT-5 ;-)",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Responsible-Newt9241",
                                    "replies": [],
                                    "created_utc": "2025-08-09T14:40:59+00:00"
                                }
                            ],
                            "created_utc": "2025-08-09T13:47:17+00:00"
                        },
                        {
                            "id": "n8232tz",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n8232tz/",
                            "body": "Codex for web/ios does not use gpt5",
                            "depth": 0,
                            "score": 1,
                            "author": "m3kw",
                            "replies": [],
                            "created_utc": "2025-08-11T04:20:13+00:00"
                        },
                        {
                            "id": "n88sw7t",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n88sw7t/",
                            "body": "I also want to try Codex CLI with Plus plan but do not understand  token  limits. Are they close to Claude Pro?",
                            "depth": 0,
                            "score": 1,
                            "author": "SensitiveWorldliness",
                            "replies": [],
                            "created_utc": "2025-08-12T06:06:47+00:00"
                        },
                        {
                            "id": "neee7og",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/neee7og/",
                            "body": "Welp now I need to learn how to use this",
                            "depth": 0,
                            "score": 1,
                            "author": "Fstr21",
                            "replies": [],
                            "created_utc": "2025-09-15T19:30:36+00:00"
                        },
                        {
                            "id": "netr713",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/netr713/",
                            "body": "I've made permanent switch - it's an order of magnitude ahead in code quality. Still waiting for more features to ship (like subagents) but bravo to the OpenAI team. They're back on top.",
                            "depth": 0,
                            "score": 1,
                            "author": "[deleted]",
                            "replies": [],
                            "created_utc": "2025-09-18T03:25:50+00:00"
                        },
                        {
                            "id": "netyy9t",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/netyy9t/",
                            "body": "https://preview.redd.it/amijvc3xnupf1.png?width=500&format=png&auto=webp&s=c422b273ca9225b7daed6524b8e4d1139d01de68\n\nIt's trash.",
                            "depth": 0,
                            "score": 1,
                            "author": "digitalskyline",
                            "replies": [],
                            "created_utc": "2025-09-18T04:21:27+00:00"
                        },
                        {
                            "id": "n7hn4ro",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hn4ro/",
                            "body": "Whats the limits? - talking about the new way of using codex cli with your subscription with no api key",
                            "depth": 0,
                            "score": 1,
                            "author": "__Loot__",
                            "replies": [
                                {
                                    "id": "n7hq3fd",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hq3fd/",
                                    "body": "Your money, it’s pay-as-you-go",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "AppointmentBoth4871",
                                    "replies": [
                                        {
                                            "id": "n7hqj78",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hqj78/",
                                            "body": "Look at my edit",
                                            "depth": 2,
                                            "score": 0,
                                            "author": "__Loot__",
                                            "replies": [
                                                {
                                                    "id": "n7hqzuf",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hqzuf/",
                                                    "body": "Yep sorry, when I used it last time it was available only via api key",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "AppointmentBoth4871",
                                                    "replies": [
                                                        {
                                                            "id": "n7hrbgr",
                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hrbgr/",
                                                            "body": "Np i just found out my self id drop 200 if I know the usage limits",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "__Loot__",
                                                            "replies": [],
                                                            "created_utc": "2025-08-07T21:35:43+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-08-07T21:34:02+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-07T21:31:39+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-07T21:29:24+00:00"
                                },
                                {
                                    "id": "n7hptz0",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hptz0/",
                                    "body": "I use API KEY, so I have no limits",
                                    "depth": 1,
                                    "score": -1,
                                    "author": "AnalystAI",
                                    "replies": [
                                        {
                                            "id": "n7hq4uu",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hq4uu/",
                                            "body": "Im talking about the new way to use codex cli with your subscription",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "__Loot__",
                                            "replies": [
                                                {
                                                    "id": "n7hwjqr",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hwjqr/",
                                                    "body": "Is that available? Source?",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "stryderjzw",
                                                    "replies": [
                                                        {
                                                            "id": "n7iakni",
                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7iakni/",
                                                            "body": "https://www.reddit.com/r/ChatGPTCoding/s/74feFYjTCF",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "__Loot__",
                                                            "replies": [],
                                                            "created_utc": "2025-08-07T23:21:13+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-08-07T22:03:19+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-07T21:29:36+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-07T21:28:04+00:00"
                                }
                            ],
                            "created_utc": "2025-08-07T21:14:12+00:00"
                        },
                        {
                            "id": "n7hxbia",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hxbia/",
                            "body": "anyway to use it via the 20 sub? or is it only pay as you go",
                            "depth": 0,
                            "score": 1,
                            "author": "cbusmatty",
                            "replies": [
                                {
                                    "id": "n7ia4sp",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ia4sp/",
                                    "body": "You can use it like Claude code now with your subscription",
                                    "depth": 1,
                                    "score": 5,
                                    "author": "__Loot__",
                                    "replies": [],
                                    "created_utc": "2025-08-07T23:18:39+00:00"
                                }
                            ],
                            "created_utc": "2025-08-07T22:07:28+00:00"
                        },
                        {
                            "id": "n7ip3fo",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ip3fo/",
                            "body": "is it better than claude? what about gemini?",
                            "depth": 0,
                            "score": 1,
                            "author": "SeaBuilder9067",
                            "replies": [
                                {
                                    "id": "n7k41g1",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7k41g1/",
                                    "body": "It is better than Claude, which was better than Gemini in coding.",
                                    "depth": 1,
                                    "score": -2,
                                    "author": "AnalystAI",
                                    "replies": [
                                        {
                                            "id": "nayoxji",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/nayoxji/",
                                            "body": "Not sure why this is getting downvoted. I've found Codex better than Claude for sorting certain problems I've had. Sure the app isn't as polished but in terms of getting things done, Codex is working nicely for me so far.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "sofarfarso",
                                            "replies": [],
                                            "created_utc": "2025-08-27T15:27:24+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T06:46:35+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T00:46:00+00:00"
                        },
                        {
                            "id": "n7j6jp2",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j6jp2/",
                            "body": "This reminds me I need to cancel my Codex account",
                            "depth": 0,
                            "score": 0,
                            "author": "Bankster88",
                            "replies": [
                                {
                                    "id": "n7muad1",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7muad1/",
                                    "body": "Good thing you posted that here on Reddit to let us all know, instead of, you know, actually just canceling it.",
                                    "depth": 1,
                                    "score": 4,
                                    "author": "damonous",
                                    "replies": [
                                        {
                                            "id": "n7nff9f",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7nff9f/",
                                            "body": "Every little bit helps",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Bankster88",
                                            "replies": [
                                                {
                                                    "id": "n7usdoz",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7usdoz/",
                                                    "body": "Man, the amount of accounts I need to cancel, there's so many tools right now that keeping track of them in a spreadsheet/notion/notebook whatever, is still not going to keep me up to date with everything I mess around with, this is our personal problems though we should probably be responsible. Oh well, I know many of you are curious about things too! that's why we're here lol",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "pop-lock",
                                                    "replies": [],
                                                    "created_utc": "2025-08-09T23:24:30+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-08T18:57:52+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T17:16:44+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T02:31:18+00:00"
                        },
                        {
                            "id": "n7j9kbx",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j9kbx/",
                            "body": "Great. Mind sharing your this take on r/vibecodecamp",
                            "depth": 0,
                            "score": 0,
                            "author": "kirrttiraj",
                            "replies": [],
                            "created_utc": "2025-08-08T02:50:34+00:00"
                        },
                        {
                            "id": "n7j5buz",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j5buz/",
                            "body": "why did you put a comma after believe?",
                            "depth": 0,
                            "score": -2,
                            "author": "djyroc",
                            "replies": [],
                            "created_utc": "2025-08-08T02:23:43+00:00"
                        }
                    ],
                    "permalink": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/"
                },
                {
                    "id": "wydd00",
                    "kind": "post",
                    "score": 1,
                    "author": "anyfactor",
                    "created": "2022-08-26T16:18:48+00:00",
                    "preview": "I am very new to GCP. I am looking for a service that is as easy to configure like Heroku was but with easy to configure",
                    "comments": [
                        {
                            "id": "ilwj3jb",
                            "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilwj3jb/",
                            "body": "[https://cloud.google.com/run/docs/tutorials/network-filesystems-fuse](https://cloud.google.com/run/docs/tutorials/network-filesystems-fuse)  \n\n\nIf this is a small app, using FUSE on Cloud Run will give you what you need",
                            "depth": 0,
                            "score": 4,
                            "author": "FaisalAbid",
                            "replies": [],
                            "created_utc": "2022-08-26T18:35:49+00:00"
                        },
                        {
                            "id": "ilwt1rp",
                            "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilwt1rp/",
                            "body": "Take a look at the Firebase suite. It should give you what you need.",
                            "depth": 0,
                            "score": 2,
                            "author": "rich_leodis",
                            "replies": [],
                            "created_utc": "2022-08-26T19:42:17+00:00"
                        },
                        {
                            "id": "ilw3l4n",
                            "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilw3l4n/",
                            "body": "If you're looking for something as easy to use as Heroku, you might consider some other alternatives before GCP. GCP is great if you have a large, complex app. But for a basic app and an easy experience, you might try Adaptable.io or Render.",
                            "depth": 0,
                            "score": 0,
                            "author": "mterrel",
                            "replies": [
                                {
                                    "id": "ilx2e7a",
                                    "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilx2e7a/",
                                    "body": "Depending on your app, GCP has Firebase, Cloud Run and even AppEngine that could be used.",
                                    "depth": 1,
                                    "score": 5,
                                    "author": "ibjhb",
                                    "replies": [
                                        {
                                            "id": "ilxh0pv",
                                            "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilxh0pv/",
                                            "body": "Watching this video as I write this comment.\n\n[Deploy Python on Firebase Hosting with Cloud Run - Firecasts](https://www.youtube.com/watch?v=t5EfITuFD9w)",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "anyfactor",
                                            "replies": [],
                                            "created_utc": "2022-08-26T22:26:30+00:00"
                                        }
                                    ],
                                    "created_utc": "2022-08-26T20:45:03+00:00"
                                },
                                {
                                    "id": "ilxgnw8",
                                    "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilxgnw8/",
                                    "body": "Thank you. I would have gone for fly.io or render in a heartbeat as this is a personal project. But my boss runs a big GCP operation -k8s, DS, MLOPS stuff like that.\n\nI was thinking of taking baby steps towards GCP. I don't enjoy DevOps much.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "anyfactor",
                                    "replies": [],
                                    "created_utc": "2022-08-26T22:23:55+00:00"
                                }
                            ],
                            "created_utc": "2022-08-26T16:54:22+00:00"
                        },
                        {
                            "id": "ilx38fc",
                            "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilx38fc/",
                            "body": "GCP is quite capable of running small apps or large ones. If you need a whole VM that you can SSH into and do whatever you like to it….the Cloud Compute is where you should start looking. You can run a Linux machine and install whatever you need like SQLite. \n\nIf you are building some type of app and don’t need the extra overhead of managing virtual machine instances, then check out App Engine or Cloud Run. You give it your code base and it takes care of running it.",
                            "depth": 0,
                            "score": 1,
                            "author": "kingh242",
                            "replies": [
                                {
                                    "id": "ilxh7un",
                                    "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilxh7un/",
                                    "body": "Does data persists in App Engine or Cloud Run? I am hoping to use same directory database like SQLite as you would do in your local machine.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "anyfactor",
                                    "replies": [
                                        {
                                            "id": "imq3qpr",
                                            "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/imq3qpr/",
                                            "body": "No you most likely won’t be able to use App Engine with SQLite. App Engine doesn’t allow writing to the file system within the instance as they are ephemeral…..best for stateless deployments. If using App Engine, one would use Cloud Storage for static and user files; and CloudSQL for database.\nIf this doesn’t seem viable for you, then Cloud Compute is the way.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "kingh242",
                                            "replies": [
                                                {
                                                    "id": "imrgbe9",
                                                    "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/imrgbe9/",
                                                    "body": "I had used cloud compute before. It was fun. I guess nothing wrong trying it again.",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "anyfactor",
                                                    "replies": [],
                                                    "created_utc": "2022-09-02T05:39:11+00:00"
                                                }
                                            ],
                                            "created_utc": "2022-09-01T23:01:15+00:00"
                                        }
                                    ],
                                    "created_utc": "2022-08-26T22:27:56+00:00"
                                }
                            ],
                            "created_utc": "2022-08-26T20:50:41+00:00"
                        }
                    ],
                    "permalink": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/"
                }
            ],
            "summary": "Users are debating between PostgreSQL on AWS and SQLite on GCP, with a preference for managed database services like Firebase and Cloud Run for simplicity. The discussion highlights a need for persistent storage solutions that are easy to configure without complex DevOps overhead.",
            "sentiment": "neutral",
            "pain_points": [
                {
                    "type": "operational",
                    "issue": "Lack of easy persistent storage for simple apps",
                    "description": "Users find it challenging to replicate Heroku's ease of use with persistent database storage, as services like Cloud Run and App Engine are often perceived as stateless.",
                    "example_quote": {
                        "id": "wydd00",
                        "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/",
                        "text": "I am very new to GCP. I am looking for a service that is as easy to configure like Heroku was but with easy to configure or VM like persistent storage solution.",
                        "score": 1,
                        "author": "anyfactor"
                    },
                    "system_actions": [
                        {
                            "title": "Prioritize managed database services",
                            "validation": "This directly addresses the core pain point of configuring persistent storage without DevOps complexity.",
                            "recommendation": "Invest in a managed database offering that is as easy to configure as Heroku but with integrated storage.",
                            "proposed_solution": "Focus product development on offering a managed database service that simplifies setup and provides persistent storage, reducing the need for user-managed solutions."
                        }
                    ],
                    "why_this_is_pain": "This creates friction for developers who want a simple, Heroku-like deployment experience without complex workarounds for data persistence.",
                    "user_suggested_solutions": [
                        {
                            "solution": "Use FUSE on Cloud Run for persistent filesystem access",
                            "example_quote": {
                                "id": "ilwj3jb",
                                "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilwj3jb/",
                                "text": "[https://cloud.google.com/run/docs/tutorials/network-filesystems-fuse](https://cloud.google.com/run/docs/tutorials/network-filesystems-fuse)",
                                "score": 4,
                                "author": "FaisalAbid"
                            }
                        },
                        {
                            "solution": "Adopt the Firebase suite for integrated database and storage",
                            "example_quote": {
                                "id": "ilwt1rp",
                                "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilwt1rp/",
                                "text": "Take a look at the Firebase suite. It should give you what you need.",
                                "score": 2,
                                "author": "rich_leodis"
                            }
                        },
                        {
                            "solution": "Consider alternative platforms like Adaptable.io or Render for simplicity",
                            "example_quote": {
                                "id": "ilw3l4n",
                                "url": "https://reddit.com/r/googlecloud/comments/wydd00/heroku_alternative_but_with_a_persistent_storage/ilw3l4n/",
                                "text": "If you're looking for something as easy to use as Heroku, you might consider some other alternatives before GCP.",
                                "score": 0,
                                "author": "mterrel"
                            }
                        }
                    ]
                }
            ],
            "signal_count": 12,
            "relevance_score": 85,
            "brands_mentioned": [
                "GCP",
                "Firebase",
                "Cloud Run",
                "Heroku"
            ],
            "demographic_signals": [
                "new to GCP",
                "looking for easy configuration",
                "small app",
                "personal project"
            ]
        },
        {
            "id": "theme_4",
            "title": "Serverless vs. Traditional Cloud",
            "quotes": [
                {
                    "id": "jxrnz7e",
                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxrnz7e/",
                    "text": "Angular, Supabase, and Sendgrid. I call it the ASS stack.",
                    "score": 23,
                    "author": "jitty"
                },
                {
                    "id": "jxqd9t9",
                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqd9t9/",
                    "text": ".NET with Angular. Hosting on Azure. SQL server as database.\n\nI use this mainly because it is very stable, which is a must for my type of B2B software",
                    "score": 23,
                    "author": "Jantje2k"
                },
                {
                    "id": "jxqpnlf",
                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqpnlf/",
                    "text": "Asp net \n\nBlazor\n\nC#\n\nPowershell\n\nAzure\n\nService bus\n\nCosmos noSQL\n\nUnity 3D (adding unreal engine in the future)",
                    "score": 12,
                    "author": "xtreampb"
                },
                {
                    "id": "jxq9rfk",
                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxq9rfk/",
                    "text": "Php and sql, Laravel, tailwindcss, alpinejs and livewire are the ones in use most. I have a vps and use git to deploy my stuff to it.  Have my mail and everything setup on the vps, hosting about 15 sites on it at the moment. Dropshipping sites mainly",
                    "score": 11,
                    "author": "ToeAffectionate1194"
                },
                {
                    "id": "jxqb570",
                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqb570/",
                    "text": "Big fan of VPS over AWS etc. I know you have more scaling options with cloud, but for most services with either a very predictable demand level or a modest user base, VPS gives you much more flexibility, control and security. You have to be mindful of fallback options in the event of the server fall",
                    "score": 9,
                    "author": "TrueSpins"
                }
            ],
            "sources": [
                {
                    "id": "1616knk",
                    "kind": "post",
                    "score": 62,
                    "author": "ClassyCamel",
                    "created": "2023-08-25T18:07:00+00:00",
                    "preview": "And what do you like/dislike about it?\n\nI'll start:\n* FastAPI (Python) for app API\n* Celery (Python) for async worker ta",
                    "comments": [
                        {
                            "id": "jxrnz7e",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxrnz7e/",
                            "body": "Angular, Supabase, and Sendgrid. I call it the ASS stack.",
                            "depth": 0,
                            "score": 23,
                            "author": "jitty",
                            "replies": [
                                {
                                    "id": "jxtr3ui",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtr3ui/",
                                    "body": "This guy codes",
                                    "depth": 1,
                                    "score": 8,
                                    "author": "OnTheGoTrades",
                                    "replies": [],
                                    "created_utc": "2023-08-26T13:28:52+00:00"
                                },
                                {
                                    "id": "jxrztd4",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxrztd4/",
                                    "body": "LMAO love it, can get enough ASS",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-26T01:53:51+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T00:21:57+00:00"
                        },
                        {
                            "id": "jxqpnlf",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqpnlf/",
                            "body": "Asp net \n\nBlazor\n\nC#\n\nPowershell\n\nAzure\n\nService bus\n\nCosmos noSQL\n\nUnity 3D (adding unreal engine in the future)",
                            "depth": 0,
                            "score": 12,
                            "author": "xtreampb",
                            "replies": [
                                {
                                    "id": "jxqqral",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqqral/",
                                    "body": "Got beef against JS?",
                                    "depth": 1,
                                    "score": 4,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxsg0md",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxsg0md/",
                                            "body": "I'm not really a fan of JavaScript. It just feels like I have to write a bunch of code again to make the website do dynamic stuff. Nothing I'm doing needs that level of craziness. So I just opt to build everything on the front end with ASP.net. Maybe if something really takes off I would refine the front end if there's a good use case for making it JavaScript heavy and dynamic.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "chaos_battery",
                                            "replies": [],
                                            "created_utc": "2023-08-26T04:17:58+00:00"
                                        },
                                        {
                                            "id": "jxuipx0",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxuipx0/",
                                            "body": "I’m a backend and DevOps engineer. I also do desktop and lower engineering. I can make it functional, not pretty. My first hire will be a frontend, maybe full stack, engineer.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "xtreampb",
                                            "replies": [],
                                            "created_utc": "2023-08-26T16:37:44+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T20:29:03+00:00"
                                },
                                {
                                    "id": "jxsef80",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxsef80/",
                                    "body": "Do you use server-side blazor or wasm blazor?\nWhat have been the cons of using Blazor in your opinion (if there is any)?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "NoUniverseExists",
                                    "replies": [
                                        {
                                            "id": "jxvb1s8",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxvb1s8/",
                                            "body": "Blazor wasm runs fully in the browser of the client. This is the same Behavior as an JS front-end.\n\nBlazor Server runs fully in the server. So the full GUI is managed by the server and sent through an SignalR connection to the browser.\n\nPros/cons Blazor WASM:\n- Pro:  Runs fully in the browser so no heavy servers needed\n- Pro:  possibility for offline support\n- Con: Runs fully in the browser so more security needed\n- Con: Client machine might need heavier hardware depending on the functionality\n\nPros/cons Blazor Server:\n- Pro: Runs fully on the server. Because of this the project can call the database (or other services) instead of going through an API.\n- Pro: Generally faster development since no API is needed (see previous point)\n- Con:  Server fully manages GUI. This might require heavier servers\n- Con: No offline support possible\n\nGenerally WASM is recommended for sites with high traffic. For software that does not have a high traffic Blazor Server is recommended due to the faster development.",
                                            "depth": 2,
                                            "score": 0,
                                            "author": "SurfaceRabbit",
                                            "replies": [],
                                            "created_utc": "2023-08-26T19:49:50+00:00"
                                        },
                                        {
                                            "id": "jxujoli",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxujoli/",
                                            "body": "I’m using server side. I’m not real familiar with frontend development. I’m a backend and DevOps engineer by trade. I’m don’t know enough to provide any opinion. It’s functional. I’m using the blazorize library to make things easier like data tables and graphs.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "xtreampb",
                                            "replies": [],
                                            "created_utc": "2023-08-26T16:43:44+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T04:02:01+00:00"
                                },
                                {
                                    "id": "jxytz2k",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxytz2k/",
                                    "body": "why would you go for a nosql?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "lrshaid",
                                    "replies": [
                                        {
                                            "id": "jxz5j89",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxz5j89/",
                                            "body": "Because of how the data is structured lends itself to non normalized data.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "xtreampb",
                                            "replies": [],
                                            "created_utc": "2023-08-27T16:34:54+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-27T15:19:31+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T20:22:14+00:00"
                        },
                        {
                            "id": "jxqd9t9",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqd9t9/",
                            "body": ".NET with Angular. Hosting on Azure. SQL server as database.\n\nI use this mainly because it is very stable, which is a must for my type of B2B software",
                            "depth": 0,
                            "score": 23,
                            "author": "Jantje2k",
                            "replies": [
                                {
                                    "id": "jxqfwih",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqfwih/",
                                    "body": "Makes sense, very solid reliable stack there",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-25T19:21:17+00:00"
                                },
                                {
                                    "id": "jxscbbg",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxscbbg/",
                                    "body": "I'm building a B2B app that needs to be super stable as well. Are you using PaaS on Azure?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "say592",
                                    "replies": [
                                        {
                                            "id": "jxsu86d",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxsu86d/",
                                            "body": "Yes, I make use of Azure App Service. For the database I use the elastic pool of azure, because my multi-tenant strategy is using a database per tenant (again because of security and reliability)",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "Jantje2k",
                                            "replies": [
                                                {
                                                    "id": "jxt05pi",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxt05pi/",
                                                    "body": "Thanks for the response, I am taking the same approach.",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "say592",
                                                    "replies": [],
                                                    "created_utc": "2023-08-26T08:24:09+00:00"
                                                },
                                                {
                                                    "id": "jxt89va",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxt89va/",
                                                    "body": "Oh, a question if you don't mind. Are you using one instance of your front end for all of your customers or does each customer have their own instance of the front end?\n\nIf your customers are sharing a front end, how are you directing them to the correct database?",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "say592",
                                                    "replies": [
                                                        {
                                                            "id": "jxu84sz",
                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxu84sz/",
                                                            "body": "I use one single App Service instance to host the backend. The frontend (Angular) is just hosted as static files.\n\nDirecting customers to the correct database is done using Finbuckle multi tenancy. The id of the tenant is provided in the header of the API request, and then I get the correct connection string by that tenant id. Of course, first is checked whether the user is allowed to view the information of that customer.\n\nAt the frontend, the tenant is a route variable in Angular.",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "Jantje2k",
                                                            "replies": [
                                                                {
                                                                    "id": "jxugngx",
                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxugngx/",
                                                                    "body": "Thanks for the response again! I'm a technical person (long time sysadmin and now IT manager) and I have a lot of domain knowledge in my product area, but I'm not a programmer. I'm trying to learn the lingo though and understand what is possible, so I'll keep this in mind when I'm talking to my developers!",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "say592",
                                                                    "replies": [
                                                                        {
                                                                            "id": "jxv1gmv",
                                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxv1gmv/",
                                                                            "body": "No problem of course! I am software developer (did a bachelor information technology), but am currently doing a bachelor in economics and business economics, to learn the marketing and business part too.\n\nI am currently working on a MVP, hoping to start my first startup",
                                                                            "depth": 6,
                                                                            "score": 1,
                                                                            "author": "Jantje2k",
                                                                            "replies": [],
                                                                            "created_utc": "2023-08-26T18:43:42+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2023-08-26T16:24:11+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2023-08-26T15:28:28+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2023-08-26T10:16:23+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-26T07:04:02+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T03:41:34+00:00"
                                },
                                {
                                    "id": "jxt95dq",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxt95dq/",
                                    "body": "What exactly makes it stable in the stack you mention? Because you can do a Flask app on Kubernetes and be more stable than everything else.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "FatefulDonkey",
                                    "replies": [
                                        {
                                            "id": "jxu8otz",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxu8otz/",
                                            "body": "Mainly that there is good documentation, that it is a compiled app, and that it is static typed.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "Jantje2k",
                                            "replies": [],
                                            "created_utc": "2023-08-26T15:32:04+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T10:28:02+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T19:04:46+00:00"
                        },
                        {
                            "id": "jxq7jfm",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxq7jfm/",
                            "body": "I use next, nest.js, turborepo, and Postgresql.\n\n\nI literally only write typescript/JavaScript and I intentionally did this because context switching is way too expensive.",
                            "depth": 0,
                            "score": 8,
                            "author": "KingRomstar",
                            "replies": [
                                {
                                    "id": "jxq8dum",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxq8dum/",
                                    "body": "I haven't heard of turborepo or nest.js before, how do you like them? It looks like you might use turborepo instead of CRA or react-scripts, is that right (I assume Next works with create-react-app nowadays, but can't remember)? \n\nI was also going to ask about nest.js vs express, but it looks like nest is vastly more fully featured. What primarily draws you to using it?\n\nWhere are you hosting? (if you are at the stage of having it deployed)",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqbb94",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqbb94/",
                                            "body": "Not the OP but I absolutely adore Nest.JS. To answer your question about Nest v. Express, Nest is a framework built *on top of Express* (with the option of Fastify), which allows integration with already-existing third party modules. It's pretty easy to learn and once you get the hang of it, makes the backend development  experience much better.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "C3L3STIALCITY",
                                            "replies": [
                                                {
                                                    "id": "jxqcdqd",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqcdqd/",
                                                    "body": "very cool, I'll be sure to check it out. I saw its *massive* table of contents and got a little intimidated",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "ClassyCamel",
                                                    "replies": [],
                                                    "created_utc": "2023-08-25T18:59:04+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T18:52:21+00:00"
                                        },
                                        {
                                            "id": "jxqciew",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqciew/",
                                            "body": "turborepo is a package to manage monorepos, that's all it is.  \n\n\nNext.js has it's own build tools and does not use CRA.  \n\n\nNest.js is a node.js framework for building out node.js back-end services while following SOLID principles but that last part isn't important IMO.  I use it to build out APIs and CRON jobs and it is very powerful and keeps the code super clean.  Their support in their DISCORD channel is next level, they're the only group that replies to my questions consistently, lol.    \n\n\nI also use PRISMA as the ORM but it is terrible and I don't recommend it. I wish I used TypeORM instead.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "KingRomstar",
                                            "replies": [
                                                {
                                                    "id": "jxqg0cx",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqg0cx/",
                                                    "body": "what makes prisma terrible? looks pretty easy to use (from its docs at least)",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "ClassyCamel",
                                                    "replies": [],
                                                    "created_utc": "2023-08-25T19:21:57+00:00"
                                                },
                                                {
                                                    "id": "jxs77f8",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs77f8/",
                                                    "body": "I’ve used typeorm but not prisma, but I would not recommend it if you want a real repository layer. Typeorm still tightly couples entities to record on a table, so even though it uses DDD terminology, it is very superficial. At this point, slonik is my choice, and I’ve given up trying to make ORMs work, as everyone Ive ever used eventually leaves me wishing I just wrote raw queries. I’ve used bookshelf, knex, and objection prior to typeorm.\n\nIf you aren’t doing DDD, then typeorm might be a reasonable choice I suppose.",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "nepsiron",
                                                    "replies": [],
                                                    "created_utc": "2023-08-26T02:55:05+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T18:59:54+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T18:33:59+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T18:28:38+00:00"
                        },
                        {
                            "id": "jxqfwol",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqfwol/",
                            "body": "Nuxt & Firebase thinking about jumping on the Svelte bandwagon though soon…",
                            "depth": 0,
                            "score": 7,
                            "author": "miketierce",
                            "replies": [
                                {
                                    "id": "jxqgfbe",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqgfbe/",
                                    "body": "I can't say I've ever used firebase but have heard a lot about it. How do you find it? easy to use? cost effective?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqwx55",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqwx55/",
                                            "body": "If you consider basically free cost effective - then yeah. It’s super easy to work with. One SDK and you’ve got literally everything you need already and then Cloud Functions are like the icing on the cake. \n\nI don’t know why anyone would want to work with anything else - which could prove I’m dumb and not worth listening to lol",
                                            "depth": 2,
                                            "score": 6,
                                            "author": "miketierce",
                                            "replies": [
                                                {
                                                    "id": "jxqyq5q",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqyq5q/",
                                                    "body": "definitely looks like pretty generous pricing after checking out their pricing info. I've always rolled my own stuff, but I know if I used them I would minimize the reads/writes to/from the DB if that's what I was being billed on",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "ClassyCamel",
                                                    "replies": [],
                                                    "created_utc": "2023-08-25T21:19:32+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T21:07:41+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T19:24:35+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T19:21:19+00:00"
                        },
                        {
                            "id": "jxqll70",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqll70/",
                            "body": "Java springboot, react\nAWS elastic beanstalk\nMySQL with liquidate for schema management\nCircleci for builds and deployments\n\nMy ci/cd setup is super. Works all the time and I’ve literally made 1000s of deployments",
                            "depth": 0,
                            "score": 5,
                            "author": "ishysredditusername",
                            "replies": [
                                {
                                    "id": "jxqmx4w",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqmx4w/",
                                    "body": "how do you like EBS? I haven't heard great reviews from people who tried it recently, but I know people who have been using it for a long time and absolutely love it",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqrx40",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqrx40/",
                                            "body": "For something that should be so easy the documentation and guidance for it is shocking which really annoyed me to start with",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "ishysredditusername",
                                            "replies": [
                                                {
                                                    "id": "jxqsuc4",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqsuc4/",
                                                    "body": "yeah, those are the basic criticisms I heard from somebody who bought an app from somebody else who deployed on beanstalk",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "ClassyCamel",
                                                    "replies": [],
                                                    "created_utc": "2023-08-25T20:41:58+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T20:36:15+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T20:05:17+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T19:56:58+00:00"
                        },
                        {
                            "id": "jxq9rfk",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxq9rfk/",
                            "body": "Php and sql, Laravel, tailwindcss, alpinejs and livewire are the ones in use most. I have a vps and use git to deploy my stuff to it.  Have my mail and everything setup on the vps, hosting about 15 sites on it at the moment. Dropshipping sites mainly",
                            "depth": 0,
                            "score": 11,
                            "author": "ToeAffectionate1194",
                            "replies": [
                                {
                                    "id": "jxqb570",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqb570/",
                                    "body": "Big fan of VPS over AWS etc. I know you have more scaling options with cloud, but for most services with either a very predictable demand level or a modest user base, VPS gives you much more flexibility, control and security. You have to be mindful of fallback options in the event of the server falling over, but provided you know what you're doing it's often a much more cost effective solution.\n\nOh, and shout out for vanilla PHP and SQL - again, not all solutions need the latest faddy stack.",
                                    "depth": 1,
                                    "score": 9,
                                    "author": "TrueSpins",
                                    "replies": [
                                        {
                                            "id": "jxqc1fk",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqc1fk/",
                                            "body": "Yes thats the main reason, sites require a lot of disk space for product images mainly, but for 15 euro y\nA month you get 500gb disk space to work with, 32gb ram and you can virtually install anything you like on it. Things like plesk, elastic search etc.",
                                            "depth": 2,
                                            "score": 3,
                                            "author": "ToeAffectionate1194",
                                            "replies": [
                                                {
                                                    "id": "jxqs5d3",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqs5d3/",
                                                    "body": "What provider has such prices?",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "dv-nt",
                                                    "replies": [
                                                        {
                                                            "id": "jxr0uzl",
                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr0uzl/",
                                                            "body": "sorry just realized that we never said it outright: Digital Ocean",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "ClassyCamel",
                                                            "replies": [],
                                                            "created_utc": "2023-08-25T21:33:52+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2023-08-25T20:37:39+00:00"
                                                },
                                                {
                                                    "id": "jxquhl6",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxquhl6/",
                                                    "body": "Curious to know what Hosting company offer such a deal with such money?",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "riterix",
                                                    "replies": [
                                                        {
                                                            "id": "jxr0uk5",
                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr0uk5/",
                                                            "body": "sorry just realized that we never said it outright: Digital Ocean",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "ClassyCamel",
                                                            "replies": [
                                                                {
                                                                    "id": "jxr3oce",
                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr3oce/",
                                                                    "body": "Are you sureit is digital ocean?, I have django web app thereon a droplet. I have never see such an offer./deal?",
                                                                    "depth": 5,
                                                                    "score": 5,
                                                                    "author": "riterix",
                                                                    "replies": [
                                                                        {
                                                                            "id": "jxra8st",
                                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxra8st/",
                                                                            "body": "Nope sorry must’ve misread- I know VPS means virtual private server but beyond that it could be anything",
                                                                            "depth": 6,
                                                                            "score": -1,
                                                                            "author": "ClassyCamel",
                                                                            "replies": [
                                                                                {
                                                                                    "id": "jxsfuly",
                                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxsfuly/",
                                                                                    "body": "Digitalocean object storage looks interesting and I'm always wanting to store media assets and binary files in cloud object storage behind a CDN because that easily reduces the server load a ton.",
                                                                                    "depth": 7,
                                                                                    "score": 1,
                                                                                    "author": "chaos_battery",
                                                                                    "replies": [],
                                                                                    "created_utc": "2023-08-26T04:16:18+00:00"
                                                                                }
                                                                            ],
                                                                            "created_utc": "2023-08-25T22:39:43+00:00"
                                                                        },
                                                                        {
                                                                            "id": "jxt5nh0",
                                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxt5nh0/",
                                                                            "body": "I have one at Strato.com",
                                                                            "depth": 6,
                                                                            "score": 1,
                                                                            "author": "ToeAffectionate1194",
                                                                            "replies": [],
                                                                            "created_utc": "2023-08-26T09:40:40+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2023-08-25T21:53:15+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2023-08-25T21:33:47+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2023-08-25T20:52:18+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T18:56:54+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T18:51:18+00:00"
                                },
                                {
                                    "id": "jxqbbu8",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqbbu8/",
                                    "body": "love the reuse of it all. Is the SQL db also running on that same vps?",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqc98u",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqc98u/",
                                            "body": "Yep",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "ToeAffectionate1194",
                                            "replies": [],
                                            "created_utc": "2023-08-25T18:58:16+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T18:52:27+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T18:42:35+00:00"
                        },
                        {
                            "id": "jxr3jlc",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr3jlc/",
                            "body": "Python/Flask, SQL, JavaScript, HTML, CSS",
                            "depth": 0,
                            "score": 5,
                            "author": "AlpacaSwimTeam",
                            "replies": [
                                {
                                    "id": "jxra0fz",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxra0fz/",
                                    "body": "Simple and straightforward. How are you serving the frontend? Flask via jinja?",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-25T22:37:59+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T21:52:20+00:00"
                        },
                        {
                            "id": "jxt7ix8",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxt7ix8/",
                            "body": "* Vue\n* Node\n* Mysql or Mongo\n\nHosting all of it on GCP's Cloud Run.",
                            "depth": 0,
                            "score": 5,
                            "author": "captain_obvious_here",
                            "replies": [
                                {
                                    "id": "jxtovfx",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtovfx/",
                                    "body": "Solid choices. How do you decide between mysql and mongo?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxtwf2f",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtwf2f/",
                                            "body": "Depending on the needs of the project, and project's data.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "captain_obvious_here",
                                            "replies": [],
                                            "created_utc": "2023-08-26T14:09:04+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T13:10:40+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T10:06:15+00:00"
                        },
                        {
                            "id": "jxryt9m",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxryt9m/",
                            "body": "Typescript, Cloudflare Workers, Web Components",
                            "depth": 0,
                            "score": 4,
                            "author": "JesterDolor",
                            "replies": [
                                {
                                    "id": "jxs0hpu",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs0hpu/",
                                    "body": "What do you mean when you say “web components”? Are you making them manually? (It’s been a while since I’ve looked into them so forgive my ignorance)",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxs2wn4",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs2wn4/",
                                            "body": "I'm not using a library, so yeah they're self rolled. I wanted see what they were all about so I started experimenting writing them scratch and ended up making them my default way to write the UI my project. I ended up adopting a Mirco-frontend architecture to go along with it as well because with caching and some other techniques they really great for it.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "JesterDolor",
                                            "replies": [
                                                {
                                                    "id": "jxultlz",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxultlz/",
                                                    "body": "*How many red flags do you want?",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "Lupexlol",
                                                    "replies": [
                                                        {
                                                            "id": "jxundkc",
                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxundkc/",
                                                            "body": "I've tried a lot modern (and legacy) frameworks for both front and backend. I can't go back after rolling my own lol",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "JesterDolor",
                                                            "replies": [
                                                                {
                                                                    "id": "jxutq9o",
                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxutq9o/",
                                                                    "body": "As a guy that built his own framework, used micro frontends (single spa) in enterprise applications, and created web components out of entire vue.js projects to load them in legacy react project I can just say that you are on the wrong path. \n\nKeep it simple in green fields projects.",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "Lupexlol",
                                                                    "replies": [
                                                                        {
                                                                            "id": "jxuzetn",
                                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxuzetn/",
                                                                            "body": "What issues did you run into?",
                                                                            "depth": 6,
                                                                            "score": 1,
                                                                            "author": "JesterDolor",
                                                                            "replies": [
                                                                                {
                                                                                    "id": "jxv1ctb",
                                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxv1ctb/",
                                                                                    "body": "The use cases for micro frontends and web components are very limited and specific, and those use cases are: \n-cross framework usability.\n-gradual framework migration.\n-legacy framework upgrades.\n\nYeah, I’m passionated about tech as well, and I love to play with these things, but if you start a new project today and you’re tech stack is made of micro frontends and web components then it’s doomed from the very beginning.\n\nYou’re simply using the wrong tool for the job.",
                                                                                    "depth": 7,
                                                                                    "score": 1,
                                                                                    "author": "Lupexlol",
                                                                                    "replies": [
                                                                                        {
                                                                                            "id": "jxv4ess",
                                                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxv4ess/",
                                                                                            "body": "> You’re simply using the wrong tool for the job.\n\n*Trust me bro\n\nThe way I used them they're basically islands like in Astro. No 1mb+ SPA to load, lazy loadable, no framework BS in general. I guess I'll fail",
                                                                                            "depth": 8,
                                                                                            "score": 1,
                                                                                            "author": "JesterDolor",
                                                                                            "replies": [
                                                                                                {
                                                                                                    "id": "jxv54lj",
                                                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxv54lj/",
                                                                                                    "body": "good luck!",
                                                                                                    "depth": 9,
                                                                                                    "score": 2,
                                                                                                    "author": "Lupexlol",
                                                                                                    "replies": [],
                                                                                                    "created_utc": "2023-08-26T19:08:47+00:00"
                                                                                                }
                                                                                            ],
                                                                                            "created_utc": "2023-08-26T19:04:00+00:00"
                                                                                        }
                                                                                    ],
                                                                                    "created_utc": "2023-08-26T18:42:57+00:00"
                                                                                }
                                                                            ],
                                                                            "created_utc": "2023-08-26T18:29:38+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2023-08-26T17:50:58+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2023-08-26T17:08:26+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2023-08-26T16:57:59+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-26T02:18:39+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T01:59:13+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T01:45:51+00:00"
                        },
                        {
                            "id": "jxqg2qm",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqg2qm/",
                            "body": "Fast API monolithic application, MySQL database all hosted on *AWS",
                            "depth": 0,
                            "score": 3,
                            "author": "avid-software-dev",
                            "replies": [
                                {
                                    "id": "jxqgkts",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqgkts/",
                                    "body": "hell yeah finally another FastAPI user- how are you deploying? Docker image to a server? kubernetes cluster?",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqhbpq",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqhbpq/",
                                            "body": "Docker container deployed into EC2 using GitHub actions. \n\nI am a Java enterprise dev but for a small Saas app Python or JS is the way.  It would take way to long to build something similar in Spring",
                                            "depth": 2,
                                            "score": 3,
                                            "author": "avid-software-dev",
                                            "replies": [
                                                {
                                                    "id": "jxqjdye",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqjdye/",
                                                    "body": "Yeah totally agreed, but I do miss having the strength of a good type system (though you can rule that out with enough unit tests). Are you paying for GH actions? I'd love to automate that part, but I just don't want to spend the money right now. Also what's running docker on your EC2s? ECS? kops? EKS? (something else?)",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "ClassyCamel",
                                                    "replies": [
                                                        {
                                                            "id": "jxqmmms",
                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqmmms/",
                                                            "body": "I pay for GitHub pro. To deploy, the runner in GitHub actions will SSH into the EC2 container cleanup the original container instance, clone the repo and redeploy using docker compose. It’s quick and dirty but part of my tech debt it to migrate to ECR and properly version my images.",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "avid-software-dev",
                                                            "replies": [
                                                                {
                                                                    "id": "jxqnwbx",
                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqnwbx/",
                                                                    "body": "Ah, yeah if you pay for pro might as well make the most of it!\n\n&#x200B;\n\nWe use GH actions at work to deploy to ECR with a versioned image and this is the syntax we use in our workflow (hopefully it's as easy as a copy/paste for you):\n\n```yaml\n- uses: docker/build-push-action@v3\n        with:\n          platforms: linux/amd64\n          push: true\n          tags: ${{ inputs.account_id }}.dkr.ecr.us-east-1.amazonaws.com/${{ inputs.image_name }}:${{ GITHUB_SHA }}\n```",
                                                                    "depth": 5,
                                                                    "score": 2,
                                                                    "author": "ClassyCamel",
                                                                    "replies": [
                                                                        {
                                                                            "id": "jxqq63u",
                                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqq63u/",
                                                                            "body": "Appreciate it thank you my friend",
                                                                            "depth": 6,
                                                                            "score": 2,
                                                                            "author": "avid-software-dev",
                                                                            "replies": [
                                                                                {
                                                                                    "id": "jxqqbrq",
                                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqqbrq/",
                                                                                    "body": "gotta lift each other up, let me know if it works 🙏",
                                                                                    "depth": 7,
                                                                                    "score": 1,
                                                                                    "author": "ClassyCamel",
                                                                                    "replies": [],
                                                                                    "created_utc": "2023-08-25T20:26:25+00:00"
                                                                                }
                                                                            ],
                                                                            "created_utc": "2023-08-25T20:25:26+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2023-08-25T20:11:19+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2023-08-25T20:03:29+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2023-08-25T19:43:20+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T19:30:13+00:00"
                                        },
                                        {
                                            "id": "jxs1me7",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs1me7/",
                                            "body": "Just deployed my FastAPI on Digital Ocean App Platform so Docker container running uvicorn. $12/month for each replica. Not sure how well it’s gonna scale yet.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "hamgribbles",
                                            "replies": [
                                                {
                                                    "id": "jxs1zhy",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs1zhy/",
                                                    "body": "Also use Laravel/React for front end but decided to keep that on VM droplet so I get Scheduler and Redis for Session, Cache, Queue.",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "hamgribbles",
                                                    "replies": [],
                                                    "created_utc": "2023-08-26T02:11:09+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-26T02:08:11+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T19:25:32+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T19:22:22+00:00"
                        },
                        {
                            "id": "jxqg7zg",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqg7zg/",
                            "body": "Laravel, MySQL, JS, JQuery.",
                            "depth": 0,
                            "score": 3,
                            "author": "Beginning-Comedian-2",
                            "replies": [
                                {
                                    "id": "jxqioj0",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqioj0/",
                                    "body": "love it, simple is best. Interesting how much Laravel is in this thread",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqm5io",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqm5io/",
                                            "body": "Yes. Interesting how much Laravel is in this thread.\n\nStable, developed, easy-to-learn backend. \n\n(I knew a guy in my previous job who knew Java, C+/C#, Python, etc. and he used Laravel for projects because it's the easiest.)",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "Beginning-Comedian-2",
                                            "replies": [
                                                {
                                                    "id": "jxqn6tv",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqn6tv/",
                                                    "body": "huh good to know. Might be time to switch from making fun of Laravel to making *use* of it! I do python for that exact reason though, I built out a \"template API\" a while back and with a few find/replace commands I have an entirely new app fully bootstrapped",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "ClassyCamel",
                                                    "replies": [
                                                        {
                                                            "id": "jxqtgas",
                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqtgas/",
                                                            "body": "Yes, you use Python for the exact same reason.\n\nUse the tools you know.\n\nNo need to reinvent the wheel.",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "Beginning-Comedian-2",
                                                            "replies": [],
                                                            "created_utc": "2023-08-25T20:45:47+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2023-08-25T20:06:56+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T20:00:32+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T19:38:49+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T19:23:18+00:00"
                        },
                        {
                            "id": "jxqj7sd",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqj7sd/",
                            "body": "Building the backend in Go. Database on MongoDB. Single codebase mobile apps and web app with Flutter. Planning to host the backend, web frontend and database on DigitalOcean droplets with self hosted mongodb. Custom coded authentication and row level data security. Custom coded file based logging. Planning for initial remote data backups to Google Drive (until backup grows over 10GB) with duck.sh and cron job. Planning for log analytics with DuckDB. I am still building my product and stack may change. Any suggestions?",
                            "depth": 0,
                            "score": 3,
                            "author": "the_qwerty_guy",
                            "replies": [
                                {
                                    "id": "jxqkq50",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqkq50/",
                                    "body": "I've been meaning to learn Go for a while, how do you like it? Was it hard to learn?\n\n\nI think from reading this I only have 2 suggestions:\n\n* move the web frontend to something that's optimized to serve static content (think: CDN from AWS Cloudfront or Cloudflare, not sure of DO has a CDN offering, but that might be easiest)\n* make sure your logs are being forwarded to DuckDB in a way that will work with another log analytics platform/provider in the case that you don't want to manage it yourself \n\nI'd probably say the same for hosting the DB yourself: definitely an appealing and cost-effective option, but I never liked the idea of tuning the configs just right and having to continually tune them as traffic/usage grows",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqn78u",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqn78u/",
                                            "body": "Go is a fantastic language. At the start it seems too verbose and primitive. Overtime you start to love the simplicity of the language because when anything fails you will know exactly what has failed as everything is explicit. \n\nThanks for your advises. Just curious to know if CDNs work well with single page app PWA? The app will be a b2b product with very less focus on aesthetics and extreme focus on functionality. \n\nAlso, as per the logs, currently I am making json logs similar to mongodb logs. Now that I think about it... Might try CSV as well for easy imports to DuckDB.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "the_qwerty_guy",
                                            "replies": [
                                                {
                                                    "id": "jxqoulg",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqoulg/",
                                                    "body": "> Also, as per the logs, currently I am making json logs similar to mongodb logs. Now that I think about it... Might try CSV as well for easy imports to DuckDB.\n\nI would definitely recommend sticking with a JSON schema for them- look into ECS (elastic common schema), it's a pretty well adopted format for JSON logs\n\n> Thanks for your advises. Just curious to know if CDNs work well with single page app PWA? The app will be a b2b product with very less focus on aesthetics and extreme focus on functionality.\n\nIn my experience, CDNs are more about making sure that your static content (HTML, CSS, JS, images, etc.) are served as quickly as possible to the end user based on their location. The PWA features will depend on your website's manifest and offline capabilities. I'm sure a CDN provider will tout specific features they have that might work well for PWAs",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "ClassyCamel",
                                                    "replies": [],
                                                    "created_utc": "2023-08-25T20:17:14+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T20:07:01+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T19:51:37+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T19:42:14+00:00"
                        },
                        {
                            "id": "jxqj8p4",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqj8p4/",
                            "body": "- wordpress on shared host for web site\n- app dashboard, angular hosted on firebase, also use firebase for users auth and datsbase\n- sdk in c++ wrapped by fastapi behind ngnix proxy",
                            "depth": 0,
                            "score": 3,
                            "author": "adel_b",
                            "replies": [
                                {
                                    "id": "jxqkzrm",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqkzrm/",
                                    "body": "you wrote python bindings for c++ code for your API? that's hardcore",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqlbm6",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqlbm6/",
                                            "body": "that allows me to use cheep vps for my api server, as request is down from few seconds to sub 100 ms",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "adel_b",
                                            "replies": [
                                                {
                                                    "id": "jxqmmzc",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqmmzc/",
                                                    "body": "woah, were your requests using just Python taking multiple seconds to respond? that's somewhat alarming",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "ClassyCamel",
                                                    "replies": [],
                                                    "created_utc": "2023-08-25T20:03:33+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T19:55:19+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T19:53:15+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T19:42:24+00:00"
                        },
                        {
                            "id": "jxqj8zc",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqj8zc/",
                            "body": "Rails and postgres running on aws.  Tailwind for css.",
                            "depth": 0,
                            "score": 3,
                            "author": "Tall-Log-1955",
                            "replies": [
                                {
                                    "id": "jxql6gu",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxql6gu/",
                                    "body": "hell yeah keep it simple. All this running on an EC2 instance? Docker/RDS? (something else?)",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqzkkt",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqzkkt/",
                                            "body": "One rds, one ec2.  App runs in a container on ec2 instance.  Deploy using MRSK/Kamal.  Ssl terminated at ALB.  All managed by terraform.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "Tall-Log-1955",
                                            "replies": [
                                                {
                                                    "id": "jxr0pny",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr0pny/",
                                                    "body": "love a good terraform management. Seems like you're paying a good amount for that infrastructure, do you feel comfortable with the bill you're at with AWS?",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "ClassyCamel",
                                                    "replies": [
                                                        {
                                                            "id": "jxr1wt7",
                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr1wt7/",
                                                            "body": "Even a single paying customer will cover the infra so no big deal 😄",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "Tall-Log-1955",
                                                            "replies": [
                                                                {
                                                                    "id": "jxr2bgw",
                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr2bgw/",
                                                                    "body": "lol fair enough! what's the ticket price? What's your product?",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "ClassyCamel",
                                                                    "replies": [
                                                                        {
                                                                            "id": "jxrm3fz",
                                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxrm3fz/",
                                                                            "body": "It's business software and costs 200 a month.",
                                                                            "depth": 6,
                                                                            "score": 2,
                                                                            "author": "Tall-Log-1955",
                                                                            "replies": [
                                                                                {
                                                                                    "id": "jxrzrhg",
                                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxrzrhg/",
                                                                                    "body": "Power to ya, hope you land a customer soon",
                                                                                    "depth": 7,
                                                                                    "score": 1,
                                                                                    "author": "ClassyCamel",
                                                                                    "replies": [],
                                                                                    "created_utc": "2023-08-26T01:53:27+00:00"
                                                                                }
                                                                            ],
                                                                            "created_utc": "2023-08-26T00:07:56+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2023-08-25T21:43:51+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2023-08-25T21:41:04+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2023-08-25T21:32:52+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T21:25:09+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T19:54:25+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T19:42:26+00:00"
                        },
                        {
                            "id": "jxqtvfm",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqtvfm/",
                            "body": "Python (backend), Anvil (a low code solution for front end), Postegres (database), AWS (hosting and running jobs.. via EC2 instances), Vercel",
                            "depth": 0,
                            "score": 3,
                            "author": "BlackandGreen2",
                            "replies": [
                                {
                                    "id": "jxqy7ty",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqy7ty/",
                                    "body": "how do you like anvil? is that faster/better for you than writing javascript?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-25T21:16:11+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T20:48:26+00:00"
                        },
                        {
                            "id": "jxr7cpt",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr7cpt/",
                            "body": "- React & React Native\n\n- PHP & Laravel\n- UIKit \n- Tailwind",
                            "depth": 0,
                            "score": 3,
                            "author": "Yiannistaos",
                            "replies": [
                                {
                                    "id": "jxravgt",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxravgt/",
                                    "body": "How’s UIKit? I couldn’t get a sense of it from the docs and how it’s different from React",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxyfthm",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxyfthm/",
                                            "body": "Its a CSS framework https://getuikit.com/",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Yiannistaos",
                                            "replies": [],
                                            "created_utc": "2023-08-27T13:38:17+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T22:44:23+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T22:18:56+00:00"
                        },
                        {
                            "id": "jxqnflp",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqnflp/",
                            "body": "Golang backend, React/Typescript/Tailwind front end. Postgres/redis.",
                            "depth": 0,
                            "score": 2,
                            "author": "Bieb",
                            "replies": [
                                {
                                    "id": "jxqpdwo",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqpdwo/",
                                    "body": "I've always reserved Redis (and cacheing in general) as something to do pretty late, in order to alleviate DB pressure. What are you using it for? Are you having good results with it?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-25T20:20:33+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T20:08:26+00:00"
                        },
                        {
                            "id": "jxr0n6y",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr0n6y/",
                            "body": "Next.js (front and back), Supabase, Vercel, Mantine\n\nWas a Go/Python/Java guy in the past. But I can deliver really fast solo with this stack.",
                            "depth": 0,
                            "score": 2,
                            "author": "[deleted]",
                            "replies": [
                                {
                                    "id": "jxr1tmp",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr1tmp/",
                                    "body": ">Mantine\n\nhaven't heard of Mantine before, looks super fully featured! How do you like it? Did you switch to it from another UI library?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-25T21:40:27+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T21:32:24+00:00"
                        },
                        {
                            "id": "jxr5il2",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr5il2/",
                            "body": "I'm pretty much using TypeScript everywhere.\n\nNest.js for API. React in the front end. Gatsby for SSR. AWS for infrastructure. Github for VC and CI/CD. PostgreSQL as a DB.\n\nBeing comfortable with the tech stack initially was the #1 consideration for me.",
                            "depth": 0,
                            "score": 2,
                            "author": "[deleted]",
                            "replies": [
                                {
                                    "id": "jxragki",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxragki/",
                                    "body": "Yeah good call with going with comfort, ends up doing wonders for productivity. I’ve seen nestjs mentioned a few times here, what’s your favorite part of it?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxrrq5z",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxrrq5z/",
                                            "body": "My favorite feature of Nest.js is probably the dependency injection container that it provides. In some of my earlier projects that I'd been involved in we had to create our own.\n\nI was able to implement a simple RBAC using Nest.js guards pretty quickly.\n\nThere are other features like Interceptors that help handle exceptions, and logging in a well structured way. You could probably build all of these features from scratch, or using 3rd party libraries, but having a robust server side framework to start with is a better option in my opinion.\n\nYou stack sounds interesting too. Good luck in your endeavor!",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "[deleted]",
                                            "replies": [
                                                {
                                                    "id": "jxs01h8",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs01h8/",
                                                    "body": "Thanks! I’ve been meaning to try using node for a project and perhaps nestjs is the robust and opinionated framework I’ve been waiting for- thanks for telling me about it!",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "ClassyCamel",
                                                    "replies": [],
                                                    "created_utc": "2023-08-26T01:55:39+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-26T00:50:05+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T22:41:18+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T22:05:55+00:00"
                        },
                        {
                            "id": "jxr7wb3",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr7wb3/",
                            "body": "Supabase / Java / Django (back end)\n\nWith\n\nNuxt / Vue & tailwind (front end)\n\nOr \n\nStatamic for any CMS work\n\nOr \n\nLaravel / Laravel Breeze\n\nI don’t tend to like these questions as they imply “my stack” is fixed. I use the right tool for the job needed, unfortunately there isn’t really a one shoe fits all. Especially when it comes too CMS vs SPA.\n\nHosting is always AWS or Kinsta\n\nHope that helps you explore some more options 😀",
                            "depth": 0,
                            "score": 2,
                            "author": "LockDown_Designer",
                            "replies": [],
                            "created_utc": "2023-08-25T22:22:47+00:00"
                        },
                        {
                            "id": "jxrbx40",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxrbx40/",
                            "body": "B2B saas: \nFrontend - Vue\nBackend - Laravel API running on DO VPS\nTransactional Email - Postmark\nPayment: stripe but slowly moving Paddle for tax handling",
                            "depth": 0,
                            "score": 2,
                            "author": "TheRealMarklarr",
                            "replies": [],
                            "created_utc": "2023-08-25T22:52:07+00:00"
                        },
                        {
                            "id": "jxrk04g",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxrk04g/",
                            "body": "Ruby on Rails.\n\nTailwindcss, Postgresql and Stimulus",
                            "depth": 0,
                            "score": 2,
                            "author": "[deleted]",
                            "replies": [
                                {
                                    "id": "jxrzpco",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxrzpco/",
                                    "body": "What’s stimulus? Had a tough time googling it, nothing came up",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxscd0b",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxscd0b/",
                                            "body": "Stimulusjs, a very simple JavaScript framework",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "[deleted]",
                                            "replies": [],
                                            "created_utc": "2023-08-26T03:42:01+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T01:52:58+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T23:52:11+00:00"
                        },
                        {
                            "id": "jxrxhfh",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxrxhfh/",
                            "body": "Minor fork and modification on [https://create.t3.gg/](https://create.t3.gg/) but it is a really good place to start",
                            "depth": 0,
                            "score": 2,
                            "author": "cryogenicplanet",
                            "replies": [
                                {
                                    "id": "jxs0dc2",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs0dc2/",
                                    "body": "Wow looks great! I’ll give it a go for my next weekend project",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-26T01:58:15+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T01:35:19+00:00"
                        },
                        {
                            "id": "jxs0pc7",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs0pc7/",
                            "body": "Coldfusion all the way!",
                            "depth": 0,
                            "score": 2,
                            "author": "Aim_Fire_Ready",
                            "replies": [
                                {
                                    "id": "jxs0vmh",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs0vmh/",
                                    "body": "Power to you! How does it compare to alternatives?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-26T02:02:16+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T02:00:52+00:00"
                        },
                        {
                            "id": "jxs70qo",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs70qo/",
                            "body": "TALL Stack FTW!",
                            "depth": 0,
                            "score": 2,
                            "author": "staticmaker1",
                            "replies": [],
                            "created_utc": "2023-08-26T02:53:29+00:00"
                        },
                        {
                            "id": "jxs7p1c",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxs7p1c/",
                            "body": "I tend to pick \"boring and old\" technologies.\n\n&#x200B;\n\n>FastAPI (Python) for app API  \n>  \n>React/Typescript for frontend\n\nI ended up with the same configuration. As much synergy as there would be for running a backend in javascript as well, my years of python experience mean I'll have way less headache with a backend in python.\n\nI evaluated all the backend web frameworks (django, flask, etc.) and decided on FastAPI despite it's relative newness because I liked how lightweight it is, its modern type system, and its presumed scalability.\n\n&#x200B;\n\n>PostgreSQL (15) for database\n\nI use MongoDB, mostly because I worked at a company that used it, so I'm more familiar with it and NoSQL semantics. So I guess an addendum to \"boring and old\" would be \"familiar-with, then boring and old\"",
                            "depth": 0,
                            "score": 2,
                            "author": "[deleted]",
                            "replies": [],
                            "created_utc": "2023-08-26T02:59:23+00:00"
                        },
                        {
                            "id": "jxscay6",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxscay6/",
                            "body": "why are you using AWS and heroku both? why not just AWS",
                            "depth": 0,
                            "score": 2,
                            "author": "PrestigiousZombie531",
                            "replies": [
                                {
                                    "id": "jxtfuo3",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtfuo3/",
                                    "body": "Because if I wanted to run an api the way I want to deploy it then it’d cost another $40/mo to run it on AWS. When we have more customers to cover that cost it’ll be one of the first things we do",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-26T11:47:11+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T03:41:28+00:00"
                        },
                        {
                            "id": "jxsh5h8",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxsh5h8/",
                            "body": "For a side project I use React/Electron for Frontend, AWS Lambda for backend (microservices), Cognito for Authentication, MySQL and DynamoDB for databases. I chose these technologies because through my job (I work for a Seattle tech company) I’m very familiar with them, and right now, since I don’t have customers and only doing R&D stuff, I can run the whole thing for less than $20 a month.",
                            "depth": 0,
                            "score": 2,
                            "author": "OkBanana6039",
                            "replies": [
                                {
                                    "id": "jxts8t8",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxts8t8/",
                                    "body": "Nice and a good cost to boot! How are you liking running your backend on lambda? I’ve heard mixed reviews especially with regards to debugging and observability",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxvdlih",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxvdlih/",
                                            "body": "I use Lambda because of the low cost of keeping it running. You don’t pay if you don’t use it. But if you need your endpoint 6 months from now, it’ll be there and work. The reviews about debugging are correct. It’s a trade off you have to decide for yourself if it’s worth it. I get around it by writing clean, unit tested code and keeping my logic as simple as possible. Honestly, that’s never been a problem for me and there ARE ways of debugging. You can run your lambdas locally using docker, and in those scenarios it’s easy to debug.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "OkBanana6039",
                                            "replies": [],
                                            "created_utc": "2023-08-26T20:07:53+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T13:37:55+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T04:29:30+00:00"
                        },
                        {
                            "id": "jxsl4i0",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxsl4i0/",
                            "body": "I used to use node/pyhton quite a lot. Django & Express were my go-to tools but nowadays it has been only nextjs with typescript on frontend (I use app router, leverage server/client components), tailwindcss for css. I still use python and nodejs for basic database scripts but that’s all. \n\nDepending on the depth of the project I sometimes do not even include a backend. For instance my latest toy project [here](https://zarareviews.com) does not have a dedicated backend and it is pretty fast.\n\nWhen I need backend, Go is my choice. I use MySQL or MongoDB for database, depending on the requirement.\n\nI deploy to AWS and Vercel also.\n\nI almost always use types. It is a life changer.",
                            "depth": 0,
                            "score": 2,
                            "author": "[deleted]",
                            "replies": [
                                {
                                    "id": "jxtq015",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtq015/",
                                    "body": "Definitely big fan of typed languages here as well. I never use python without type hints and a static type checker anymore. How do you like go? I’ve been meaning to try it for a while but haven’t made the time yet",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-26T13:20:00+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T05:12:05+00:00"
                        },
                        {
                            "id": "jxst65c",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxst65c/",
                            "body": "React with TypeScript for the frontend, NodeJS with TypeScript in the backend. Postgresql database, all deployed on AWS. \n\nThe backend runs in a Lambda function that pretends to be a Node Express webserver. \n\nThat allows me to run the same backend on my local dev machine, without the Lambda hassle.",
                            "depth": 0,
                            "score": 2,
                            "author": "bohlenlabs",
                            "replies": [
                                {
                                    "id": "jxtpb5j",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtpb5j/",
                                    "body": "Nice setup. I have a friend who ran her company with a flask api deployed to lambda functions but had a tough time with debugging and observability. How are you finding it?",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxtqdyt",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtqdyt/",
                                            "body": "I debug everything on my Mac until it runs fine. When an error occurs only in production (extremely rare case), I edit the code in the AWS Lambda console, put in some `console.log()` statements, and deploy the live changes. 😳😄\n\nAWS Lambda logs to Cloudwatch. For observability, I sometimes look into the logs, using a [simple command line tool called \"cw\"](https://github.com/lucagrulla/cw). `cw tail -f` works pretty well.\n\nAlso for observability, I use the free version of [Honeycomb](https://honeycomb.io). This allows me to understand the hairy problems (if any).",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "bohlenlabs",
                                            "replies": [
                                                {
                                                    "id": "jxtwnoh",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtwnoh/",
                                                    "body": "oh wow I had no idea honeycomb had a free tier! I've wanted to use it for a while and this might be just the push I needed",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "ClassyCamel",
                                                    "replies": [],
                                                    "created_utc": "2023-08-26T14:10:48+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-26T13:23:06+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T13:14:17+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T06:50:14+00:00"
                        },
                        {
                            "id": "jxst67m",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxst67m/",
                            "body": "Rails, Vue, Postgres",
                            "depth": 0,
                            "score": 2,
                            "author": "quakedamper",
                            "replies": [
                                {
                                    "id": "jxtp52y",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtp52y/",
                                    "body": "Does rails play nice with vue? I haven’t used it in a while but my last memory was that anything but react or jquery didn’t come out of the box",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxtphus",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtphus/",
                                            "body": "It's gaining traction for sure. Here's an example repo of a setup.\n\n[https://github.com/zakariaf/rails-base-app#front-end](https://github.com/zakariaf/rails-base-app#front-end)",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "quakedamper",
                                            "replies": [],
                                            "created_utc": "2023-08-26T13:15:50+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T13:12:53+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T06:50:15+00:00"
                        },
                        {
                            "id": "jxt0owd",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxt0owd/",
                            "body": "Chrome extension:\n- Svelte/typescript frontend\n- Firebase Firestore for database\n- Firebase auth for auth\n- Firebase cloud functions for backend\n\nLanding page + Blog (todo)\n- Astro\n- Svelte",
                            "depth": 0,
                            "score": 2,
                            "author": "[deleted]",
                            "replies": [
                                {
                                    "id": "jxtp1nh",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtp1nh/",
                                    "body": "Love how simple that stack is when you don’t need a backend. Are you going to roll your own blog? A friend and I decided to just use a medium publication for our blog for now",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-26T13:12:05+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T08:31:41+00:00"
                        },
                        {
                            "id": "jxtf2wo",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtf2wo/",
                            "body": "Laravel, Tailwind, Livewire or React\n\nthis is your ultimate way for building scalable & shipping fast.",
                            "depth": 0,
                            "score": 2,
                            "author": "thisismehrab",
                            "replies": [
                                {
                                    "id": "jxtomru",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtomru/",
                                    "body": "Heard a lot about tailwind but haven’t tried it yet because I’m comfortable with (and enjoy writing) CSS. How is it working for you?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-26T13:08:36+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T11:39:08+00:00"
                        },
                        {
                            "id": "jxtseal",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtseal/",
                            "body": "Great to see you're using FastAPI and AWS! My stack is similar but I use Docker for containerization and Kubernetes for orchestration. I find this setup to be highly scalable. However, the initial learning curve was steep.\"",
                            "depth": 0,
                            "score": 2,
                            "author": "HumanityFirst16",
                            "replies": [
                                {
                                    "id": "jxtwe4g",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtwe4g/",
                                    "body": "yeah I can imagine! I want to move it to k8s as soon as we have the funds to pay for it, but right now it's just an extra expense without any benefit at our scaale/size",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-26T14:08:53+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T13:39:06+00:00"
                        },
                        {
                            "id": "jxu3ekz",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxu3ekz/",
                            "body": "Frontend:  \n\\- Preact (react but smaller) with TypeScript  \nBackend:  \n\\- NestJS with Fastify  \n\\- MongoDB for DB  \n\n\nAlthough I see a lot of people use Postgres, in my case my saas is pretty lightweight so my familiarity with mongo seems to be working fine until now.",
                            "depth": 0,
                            "score": 2,
                            "author": "voltomper",
                            "replies": [],
                            "created_utc": "2023-08-26T14:56:43+00:00"
                        },
                        {
                            "id": "jxu7af8",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxu7af8/",
                            "body": "Really depends. If it’s a B2B:\n.NET Backend with SQL Server,\nAuth0 for Authentication,\nVue.js for front end,\nAWS/Azure,\nRedis for Caching.\n\nB2C (mostly single dev projects):\nNext.js, PostgreSQL, Auth0, Vercel",
                            "depth": 0,
                            "score": 2,
                            "author": "JillOkk",
                            "replies": [],
                            "created_utc": "2023-08-26T15:22:58+00:00"
                        },
                        {
                            "id": "jxunkry",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxunkry/",
                            "body": "NextJS + serverless MongoDB + imagekit thats it.",
                            "depth": 0,
                            "score": 2,
                            "author": "raiadi",
                            "replies": [],
                            "created_utc": "2023-08-26T17:09:45+00:00"
                        },
                        {
                            "id": "jxunqzv",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxunqzv/",
                            "body": "TALL Stack with Python/Flask for app backend",
                            "depth": 0,
                            "score": 2,
                            "author": "MakeMovesThatMatter",
                            "replies": [
                                {
                                    "id": "jxupomj",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxupomj/",
                                    "body": "python/flask instead of laravel/livewire?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxuruqm",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxuruqm/",
                                            "body": "No, I love LOVE PHP. It was my first language after HTML 15 years ago. Laravel and Livewire makes coding apps fun and easy. \n\nI love Python too, been using for about 5 years. I use it to create data scrapers and other custom automation tools, then I'll build a custom API endpoint to call from my TALL backend.\n\nEverything is typically ran off the same server, so the 2 backends are connected to the same SQL database.\n\nThe alternative for Python was JS, and I really don't like JS very much. Plus, Laravel+Livewire takes care of the Ajax requests so I can load variables without entire page load like ReactJS.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "MakeMovesThatMatter",
                                            "replies": [],
                                            "created_utc": "2023-08-26T17:38:21+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T17:23:53+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T17:10:55+00:00"
                        },
                        {
                            "id": "jxvdt1b",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxvdt1b/",
                            "body": "React/Typescript Frontend hosted on AWS, Mongo Atlas for DB, API Gateway and Lambdas written in GO, and a lot of AWS services for various other things (i.e. SNS, S3, SQS, etc.). We manage all of our infrastructure through Terraform. CI/CD through GitHub actions workflows.\n\nWe maintain and deploy multiple projects with a small team so we pretty much use managed everything.  It's dumb expensive at times, but saves so much mental bandwidth not having to worry about infrastructure all the time.",
                            "depth": 0,
                            "score": 2,
                            "author": "EfficientNobody19915",
                            "replies": [],
                            "created_utc": "2023-08-26T20:09:23+00:00"
                        },
                        {
                            "id": "jxvimmd",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxvimmd/",
                            "body": "Mine are:\n- PHP with Swoole or Nginx\n- Python with FastAPI or Flask\n- Rust with Rocket\n- Mysql, PostgreSQL, MongoDB, ClickHouse\n- Redis, Memcached \n- RabbitMQ, Kafka\n- Docker, Compose, Swarm\n- HTML, SASS/CSS, ES6",
                            "depth": 0,
                            "score": 2,
                            "author": "iamrossalex",
                            "replies": [],
                            "created_utc": "2023-08-26T20:43:29+00:00"
                        },
                        {
                            "id": "jxwq8vh",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxwq8vh/",
                            "body": "Nextjs deployed on Vercel\n\nSupabase for backend\n\nSendpulse to send emails\n\nLogtail for monitoring\n\nAll on the free tier. Keep it simple. Keep it cheap.",
                            "depth": 0,
                            "score": 2,
                            "author": "AutomataApp",
                            "replies": [
                                {
                                    "id": "jxy9cjo",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxy9cjo/",
                                    "body": "nice, love a good free tier solution",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-27T12:43:38+00:00"
                                }
                            ],
                            "created_utc": "2023-08-27T02:17:54+00:00"
                        },
                        {
                            "id": "jxwwysk",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxwwysk/",
                            "body": "Next.js, Vercel, Node, MongoDB, Azure, Upstash",
                            "depth": 0,
                            "score": 2,
                            "author": "Unhappy-Put6205",
                            "replies": [
                                {
                                    "id": "jxy9730",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxy9730/",
                                    "body": ">Upstash\n\nNever heard of upstash before, are you using it for Redis?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-27T12:42:13+00:00"
                                }
                            ],
                            "created_utc": "2023-08-27T03:15:01+00:00"
                        },
                        {
                            "id": "jxyex0d",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxyex0d/",
                            "body": "Python, DJango, NextJs, MySql, MongoDb, AWS",
                            "depth": 0,
                            "score": 2,
                            "author": "maxline100",
                            "replies": [],
                            "created_utc": "2023-08-27T13:31:07+00:00"
                        },
                        {
                            "id": "jxyxh8z",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxyxh8z/",
                            "body": "React / Next.js, Vercel, GCP, Firebase & Firestore \n\nHow did you fund Squarespace for speed and SEO?",
                            "depth": 0,
                            "score": 2,
                            "author": "sshintrade",
                            "replies": [],
                            "created_utc": "2023-08-27T15:42:55+00:00"
                        },
                        {
                            "id": "jxqahp8",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqahp8/",
                            "body": "Laravel 10, Vue 3, InertiaJS, Tailwind, Vite.\n\nRunning a 5k/day visits for 18$ on a DO Droplet. I also host Redis, 4 MySQL DBs here. I have two websites, each site has a staging instance.\n\nI also spend $12 per month on Laravel Forge for deployment.\n\nThe droplet also runs around 20k background tasks a day using a queue (Laravel Horizon)",
                            "depth": 0,
                            "score": 4,
                            "author": "[deleted]",
                            "replies": [
                                {
                                    "id": "jxqbz14",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqbz14/",
                                    "body": "wow I'm way behind the times with Vue, haven't checked it out in a few years, but totally missed the V3 dropped",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqdkut",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqdkut/",
                                            "body": "I've been using Vue 3 Composition API since they released it and it's just amazing. I love it.",
                                            "depth": 2,
                                            "score": 4,
                                            "author": "[deleted]",
                                            "replies": [],
                                            "created_utc": "2023-08-25T19:06:43+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T18:56:28+00:00"
                                },
                                {
                                    "id": "jxqb9zk",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqb9zk/",
                                    "body": "What size droplet?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "dungeonpost",
                                    "replies": [
                                        {
                                            "id": "jxqbkge",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqbkge/",
                                            "body": "I have edited my post, as I didn't consider other services I use. The droplet is $18.00 2 GiB\t2 vCPUs\t3,000 GiB\t60 GiB",
                                            "depth": 2,
                                            "score": 3,
                                            "author": "[deleted]",
                                            "replies": [
                                                {
                                                    "id": "jxqc7wm",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqc7wm/",
                                                    "body": "didn't realize DO was that cheap compared to AWS! I'll have to take a look at that next time",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "ClassyCamel",
                                                    "replies": [
                                                        {
                                                            "id": "jxqdn3h",
                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqdn3h/",
                                                            "body": "For me personally with AWS is that they don't take my card, for some reason. DO never failed me.",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "[deleted]",
                                                            "replies": [
                                                                {
                                                                    "id": "jxqfnzv",
                                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqfnzv/",
                                                                    "body": "weird! definitely don't blame you for abandoning them- hope DO stays golden for you",
                                                                    "depth": 5,
                                                                    "score": 2,
                                                                    "author": "ClassyCamel",
                                                                    "replies": [],
                                                                    "created_utc": "2023-08-25T19:19:48+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2023-08-25T19:07:07+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2023-08-25T18:58:02+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T18:53:57+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T18:52:08+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T18:47:12+00:00"
                        },
                        {
                            "id": "jxqhfl8",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqhfl8/",
                            "body": "Nest.js, React, TypeScript and Tailwind",
                            "depth": 0,
                            "score": 2,
                            "author": "SavannaIdiot",
                            "replies": [
                                {
                                    "id": "jxqjla3",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqjla3/",
                                    "body": "second nest.js I've seen in this thread, getting increasingly curious. How do you like it?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-25T19:44:36+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T19:30:53+00:00"
                        },
                        {
                            "id": "jxqhjz2",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqhjz2/",
                            "body": "Next.js (frontend & api), Planetscale (database), Stripe (payments), Vercel (hosting). \n\nKeeps everything basically free and can scale easy for cheap.",
                            "depth": 0,
                            "score": 1,
                            "author": "DasBeasto",
                            "replies": [
                                {
                                    "id": "jxqjye0",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqjye0/",
                                    "body": "never heard of Planetscale, but it looks useful, though really expensive. Are you paying for it? How do you like it?",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxqmv9b",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqmv9b/",
                                            "body": "Nope I’m still on the free tier and nothing I’ve ever built has gone over that haha. It’s a great service imo, with the biggest draws being built in branching so I can have a dev/prod database that I can commit to like GitHub, and unlimited concurrent connections which is great for serverless. I use it with Prisma and they have a great getting started guide for Planetscale.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "DasBeasto",
                                            "replies": [
                                                {
                                                    "id": "jxqo5vo",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqo5vo/",
                                                    "body": "ah nice, big fan of high connection limits. Sounds super useful to have a dev/prod feature in the free tier as well!",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "ClassyCamel",
                                                    "replies": [],
                                                    "created_utc": "2023-08-25T20:12:56+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T20:04:58+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T19:46:52+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T19:31:40+00:00"
                        },
                        {
                            "id": "jxqq99d",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqq99d/",
                            "body": "For the most part: Node, Fastify, Postgres, Svelte.",
                            "depth": 0,
                            "score": 1,
                            "author": "[deleted]",
                            "replies": [
                                {
                                    "id": "jxqqx0o",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqqx0o/",
                                    "body": "very nice, low overhead and lean resource usage on that stack",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-25T20:30:02+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T20:25:59+00:00"
                        },
                        {
                            "id": "jxqszn2",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqszn2/",
                            "body": "Node.js / Express Backend + Swift / SwiftUI Frontend.",
                            "depth": 0,
                            "score": 1,
                            "author": "SurgicalInstallment",
                            "replies": [
                                {
                                    "id": "jxqt9n3",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqt9n3/",
                                    "body": "nice! haven't seen a native build in here yet- what made you want to go straight to iOS instead of any cross-platform play?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxr0xqy",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr0xqy/",
                                            "body": "well, i tried with React Native (and flutter). Found them to be janky, low effort in term of polish, swaying away from platform UI/UX, resulting in sub par UI/UX, and at the end, i didn't save anytime either. I was building native bridges so i was like...where's the advantage? \n\n\nif you want a detailed answer, google airbnb's blog where they wrote about giving up on react native.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "SurgicalInstallment",
                                            "replies": [],
                                            "created_utc": "2023-08-25T21:34:22+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T20:44:39+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T20:42:53+00:00"
                        },
                        {
                            "id": "jxqam7j",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqam7j/",
                            "body": "God, more stack porn.",
                            "depth": 0,
                            "score": 0,
                            "author": "TrueSpins",
                            "replies": [],
                            "created_utc": "2023-08-25T18:48:00+00:00"
                        },
                        {
                            "id": "jxqn8e4",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqn8e4/",
                            "body": "Php Laravel 10 as framework, MySQL as database, Vue js and vanilla js frontend with bootstrap. Hosted on a VPS from Linode.",
                            "depth": 0,
                            "score": 1,
                            "author": "One-Spaghetti",
                            "replies": [
                                {
                                    "id": "jxqp1kx",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqp1kx/",
                                    "body": "is vanillajs real? I thought it was released as a joke against all the frontend frameworks/libraries that were being released in the mid 2010s",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-25T20:18:27+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T20:07:13+00:00"
                        },
                        {
                            "id": "jxqney7",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqney7/",
                            "body": "Several stacks for different products. Python+FastAPI+MySQL, Python+Flask+MySQL, PHP+MySQL+Solr\n\nServer side html, Vue3, Bootstrap 4 and 5.",
                            "depth": 0,
                            "score": 1,
                            "author": "fiskfisk",
                            "replies": [
                                {
                                    "id": "jxqp6ew",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxqp6ew/",
                                    "body": "I love to switch it up and test out different stuff too. What's been your favorite/least favorite so far?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxr2opd",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr2opd/",
                                            "body": "Mainly shit just works, so we generally don't chase technology; a few things we maintain is 10-15 years and still trot along just nicely. \n\nIf it works, let it to its thing and don't fsck it up.\n\nWe're generally using FastAPI for new products now, since we have built a bit of experience on it.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "fiskfisk",
                                            "replies": [
                                                {
                                                    "id": "jxr9wzm",
                                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxr9wzm/",
                                                    "body": "Yeah that’s the way to go for stability, stick with time tested tech that works. Do you end up upgrading to new major versions for old software?",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "ClassyCamel",
                                                    "replies": [
                                                        {
                                                            "id": "jxsluo2",
                                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxsluo2/",
                                                            "body": "Yes, we use dependabot og GitHub Actions for as much as possible. We have decent test coverage for most of the products, so generally its just merge and deploy. We still use regular vps/VMs, but are transitioning to k3s/k8s/argocd.",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "fiskfisk",
                                                            "replies": [],
                                                            "created_utc": "2023-08-26T05:20:29+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2023-08-25T22:37:18+00:00"
                                                }
                                            ],
                                            "created_utc": "2023-08-25T21:46:23+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-25T20:19:17+00:00"
                                }
                            ],
                            "created_utc": "2023-08-25T20:08:19+00:00"
                        },
                        {
                            "id": "jxt7q3b",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxt7q3b/",
                            "body": "Flask / Fastapi for for Backend\n\nReact / Zustand / Redux for Frontend\n\nBootstrap / CSS for Design\n\nRQ for Tasks\n\nPostgres \n\nRedis for Pub/Sub\n\nNixOS / Docker /Dedicated Hosting",
                            "depth": 0,
                            "score": 2,
                            "author": "gaX3A5dSv6",
                            "replies": [
                                {
                                    "id": "jxtorcw",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtorcw/",
                                    "body": "Both RQ and redis? How do you decide to use one over the other?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jxtrezi",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtrezi/",
                                            "body": "redis/1\nredis/2\n\nuse different redis dbs in the same instances.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "gaX3A5dSv6",
                                            "replies": [],
                                            "created_utc": "2023-08-26T13:31:21+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T13:09:42+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T10:08:58+00:00"
                        },
                        {
                            "id": "jxtfbkw",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtfbkw/",
                            "body": "Express, Postgresql, React",
                            "depth": 0,
                            "score": 1,
                            "author": "Lazy-Entertainment-7",
                            "replies": [
                                {
                                    "id": "jxtoff0",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtoff0/",
                                    "body": "love a good PERN stack",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [],
                                    "created_utc": "2023-08-26T13:06:52+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T11:41:42+00:00"
                        },
                        {
                            "id": "jxtfvz5",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtfvz5/",
                            "body": "Laravel/Vue(Inertia/Inkline)/Postgres/GitLab(CI/CD)/Digital Ocean (Droplet, Spaces for S3)",
                            "depth": 0,
                            "score": 1,
                            "author": "akian0",
                            "replies": [
                                {
                                    "id": "jxtode4",
                                    "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxtode4/",
                                    "body": "Very nice. Haven’t heard of inertia/inkline before, how do you like them?",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "ClassyCamel",
                                    "replies": [
                                        {
                                            "id": "jy1bnzo",
                                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jy1bnzo/",
                                            "body": "Thanks; great stack. Inkline is a UI framework for Vue; was using it for years, but it's getting excellent traction now. Inertia is a monolith stack (no need to write apis for routing), but SSR is not as smooth. Thinking of going back to Nuxt for the landing.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "akian0",
                                            "replies": [],
                                            "created_utc": "2023-08-28T01:45:45+00:00"
                                        }
                                    ],
                                    "created_utc": "2023-08-26T13:06:25+00:00"
                                }
                            ],
                            "created_utc": "2023-08-26T11:47:32+00:00"
                        },
                        {
                            "id": "jxu5zzg",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jxu5zzg/",
                            "body": "Out and out Next.js",
                            "depth": 0,
                            "score": 1,
                            "author": "iScorpious",
                            "replies": [],
                            "created_utc": "2023-08-26T15:14:22+00:00"
                        },
                        {
                            "id": "jy2cnp5",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jy2cnp5/",
                            "body": "I use Next Js with Tailwind, Prisma and a Postgres DB. Really happy with it.",
                            "depth": 0,
                            "score": 1,
                            "author": "Awkward-Plate7826",
                            "replies": [],
                            "created_utc": "2023-08-28T08:19:58+00:00"
                        },
                        {
                            "id": "jy7o7k8",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/jy7o7k8/",
                            "body": "FastAPI (app api)\n\nSocketIO for notification and realtime things.\n\nPostgreSQL for app database server.\n\nReactjs for app frontend. (Tailwindcss)\n\nFlutter for mobile app (iOS and Android)\n\nPHP, Mysql (sometime use jQuery) for app's website. (Tailwindcss)\n\nAWS for hosting website and app backend.",
                            "depth": 0,
                            "score": 1,
                            "author": "rudrakshyabarman",
                            "replies": [],
                            "created_utc": "2023-08-29T10:44:52+00:00"
                        },
                        {
                            "id": "k04ierg",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/k04ierg/",
                            "body": "Nodejs, express and mongodb in the backend. Vuejs + Vuetify in the frontend",
                            "depth": 0,
                            "score": 1,
                            "author": "PaprikaYT",
                            "replies": [],
                            "created_utc": "2023-09-11T15:55:13+00:00"
                        },
                        {
                            "id": "k1phug6",
                            "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/k1phug6/",
                            "body": "Go, JS, Docker, AWS",
                            "depth": 0,
                            "score": 1,
                            "author": "software38",
                            "replies": [],
                            "created_utc": "2023-09-22T13:09:20+00:00"
                        }
                    ],
                    "permalink": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/"
                }
            ],
            "summary": "Users discuss Heroku for API deployment ($7/mo) versus AWS for infrastructure ($20/mo), highlighting cost-effectiveness and ease of use for beta testing. Traditional cloud hosting on AWS EC2/RDS is also mentioned as a viable alternative for more control.",
            "sentiment": "neutral",
            "pain_points": [
                {
                    "type": "financial",
                    "issue": "High cost of traditional cloud hosting",
                    "description": "Users find AWS hosting costs ($20+/mo) and Heroku API deployment ($7/mo) to be expensive for initial beta testing with 100 users.",
                    "example_quote": {
                        "id": "1616knk",
                        "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/",
                        "text": "Costs just under $20/mo",
                        "score": 62,
                        "author": "ClassyCamel"
                    },
                    "system_actions": [
                        {
                            "title": "Optimize hosting costs for beta testing",
                            "validation": "Heroku offers low-cost API hosting ($7/mo) while VPS provides flexible backend deployment at lower costs than traditional cloud.",
                            "recommendation": "Deploy beta backend on Heroku API and VPS for database/processing tasks to stay under $50/mo total.",
                            "proposed_solution": "Implement serverless solutions like Heroku for APIs and VPS for backend to minimize costs during beta testing."
                        }
                    ],
                    "why_this_is_pain": "Cost constraints are critical for early-stage startups, making expensive hosting options unsustainable for beta testing phases.",
                    "user_suggested_solutions": [
                        {
                            "solution": "Use cheaper hosting like Heroku for APIs and VPS for backend",
                            "example_quote": {
                                "id": "1616knk",
                                "url": "https://reddit.com/r/SaaS/comments/1616knk/for_those_who_are_coding_what_is_your_tech_stack/",
                                "text": "I'm very comfortable with Python (professionally) and it's been easy to spin up",
                                "score": 62,
                                "author": "ClassyCamel"
                            }
                        }
                    ]
                }
            ],
            "signal_count": 10,
            "relevance_score": 85,
            "brands_mentioned": [
                "Heroku",
                "AWS",
                "Digital Ocean"
            ],
            "demographic_signals": [
                "SaaS founders",
                "developers",
                "startup builders"
            ]
        },
        {
            "id": "theme_5",
            "title": "AI Provider Integration",
            "quotes": [
                {
                    "id": "n7hq5ab",
                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hq5ab/",
                    "text": "Surprisingly, it is MUCH faster then Claude Code and it is MUCH cheaper (\\~3-5x cheaper in total).",
                    "score": 27,
                    "author": "AnalystAI"
                },
                {
                    "id": "n7hugmx",
                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hugmx/",
                    "text": "We're gonna need a subreddit for using ChatGPT for coding. Oh wait..",
                    "score": 17,
                    "author": "apf6"
                },
                {
                    "id": "n7hlgvj",
                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hlgvj/",
                    "text": "I'm willing to give it a go. Claude Code was so good last month, if it can get near that then I'm a happy chappy.",
                    "score": 15,
                    "author": "NicholasAnsThirty"
                },
                {
                    "id": "n7intjc",
                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7intjc/",
                    "text": "it basically fixed most of my buggy code. it is pretty good ngl",
                    "score": 7,
                    "author": "SnooBunnies7313"
                },
                {
                    "id": "n7lzzh4",
                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lzzh4/",
                    "text": "    I agree tbh. \n    \n    Try this. I forked gemini-cli made it mulit-provider and added claude-style todo lists. Works great with GPT-5.\n    \n    https://github.com/acoliver/llxprt-code\n    npm install -g @vybestack/llxprt-code",
                    "score": 6,
                    "author": "acoliver"
                }
            ],
            "sources": [
                {
                    "id": "1mkbkiv",
                    "kind": "post",
                    "score": 124,
                    "author": "AnalystAI",
                    "created": "2025-08-07T20:46:40+00:00",
                    "preview": "In the past OpenAI models were not good enough for vibe-coding. I preferred Claude Code with Sonnet 4. \n\nAfter the prese",
                    "comments": [
                        {
                            "id": "n7hlgvj",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hlgvj/",
                            "body": "I'm willing to give it a go. Claude Code was so good last month, if it can get near that then I'm a happy chappy.",
                            "depth": 0,
                            "score": 15,
                            "author": "NicholasAnsThirty",
                            "replies": [],
                            "created_utc": "2025-08-07T21:05:50+00:00"
                        },
                        {
                            "id": "n7hq5ab",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hq5ab/",
                            "body": "Surprisingly, it is MUCH faster then Claude Code and it is MUCH cheaper (\\~3-5x cheaper in total).",
                            "depth": 0,
                            "score": 27,
                            "author": "AnalystAI",
                            "replies": [
                                {
                                    "id": "n7yurbp",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7yurbp/",
                                    "body": "\n\nI logged in via \"OpenAI account\" not with API key. How can I verify I have selected a specific model?\n\nBecause it is accepting any model name like \"codex -m gpt-53333\".\n\nI asked \"What model you are using?\" and it replied \".... I’m an OpenAI G\n\nPT‑4‑class assistant ....\".",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "RageshAntony",
                                    "replies": [
                                        {
                                            "id": "nb6fkv8",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/nb6fkv8/",
                                            "body": "The \\`/status\\` command will show that info. Also, you can select a model with the \\`/model\\` command. Just type these in as if they would prompts.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "istvan-ujjmeszaros",
                                            "replies": [],
                                            "created_utc": "2025-08-28T18:29:38+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-10T17:03:32+00:00"
                                },
                                {
                                    "id": "n7lzpnz",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lzpnz/",
                                    "body": "Um.. You still pay by the token. I think it might be cheaper by the token but not against a max subscription.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "acoliver",
                                    "replies": [
                                        {
                                            "id": "n7qnwhf",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7qnwhf/",
                                            "body": "You can use your ChatGPT subscription with cli Codex now.",
                                            "depth": 2,
                                            "score": 5,
                                            "author": "leynosncs",
                                            "replies": [],
                                            "created_utc": "2025-08-09T07:09:35+00:00"
                                        },
                                        {
                                            "id": "n7maykb",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7maykb/",
                                            "body": "https://old.reddit.com/r/ChatGPTCoding/comments/1mk9do4/you_can_now_use_your_pluspro_for_codex_cli/\n\nHave not used GPT-5 much but had one issue that Claude was derping a bit not able to figure it out and GPT fixed. I guess verdict still out on what I prefer generally (and from the 4.1 Opus post it sounds like 5.0 might be coming in a few weeks?) but definitely wort trying out.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "relderpaway",
                                            "replies": [],
                                            "created_utc": "2025-08-08T15:45:12+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T14:52:03+00:00"
                                }
                            ],
                            "created_utc": "2025-08-07T21:29:40+00:00"
                        },
                        {
                            "id": "n7intjc",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7intjc/",
                            "body": "it basically fixed most of my buggy code. it is pretty good ngl",
                            "depth": 0,
                            "score": 7,
                            "author": "SnooBunnies7313",
                            "replies": [],
                            "created_utc": "2025-08-08T00:38:19+00:00"
                        },
                        {
                            "id": "n7hugmx",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hugmx/",
                            "body": "We're gonna need a subreddit for using ChatGPT for coding. Oh wait..",
                            "depth": 0,
                            "score": 17,
                            "author": "apf6",
                            "replies": [],
                            "created_utc": "2025-08-07T21:52:21+00:00"
                        },
                        {
                            "id": "n7j3ltk",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j3ltk/",
                            "body": "For those who have tested in would GPT-5 in Codex be more similar to Opus or Sonnet?\n\nEqually, I'd be interested in any real world feedback on how well it handles context. I know it has a larger context window than Claude Code, but Claude Code is generally very good at pulling the correct files or parts of files into its context in order to solve problems. Is Codex just as good?",
                            "depth": 0,
                            "score": 5,
                            "author": "paul-towers",
                            "replies": [
                                {
                                    "id": "n7l4qyy",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l4qyy/",
                                    "body": "Codex is too far behind competitors atm",
                                    "depth": 1,
                                    "score": 5,
                                    "author": "Still-Ad3045",
                                    "replies": [
                                        {
                                            "id": "n7lzzh4",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lzzh4/",
                                            "body": "    I agree tbh. \n    \n    Try this. I forked gemini-cli made it mulit-provider and added claude-style todo lists. Works great with GPT-5.\n    \n    https://github.com/acoliver/llxprt-code\n    npm install -g @vybestack/llxprt-code",
                                            "depth": 2,
                                            "score": 6,
                                            "author": "acoliver",
                                            "replies": [
                                                {
                                                    "id": "n7urolh",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7urolh/",
                                                    "body": "You, are badass. This tool compliments that, and I appreciate you for sending it here. Thank you!",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "pop-lock",
                                                    "replies": [],
                                                    "created_utc": "2025-08-09T23:20:08+00:00"
                                                },
                                                {
                                                    "id": "n8145zz",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n8145zz/",
                                                    "body": "very sexy, I will likely turn this into an MCP server by forking my own [gemini-mcp-tool](https://github.com/jamubc/gemini-mcp-tool)",
                                                    "depth": 3,
                                                    "score": 2,
                                                    "author": "Still-Ad3045",
                                                    "replies": [
                                                        {
                                                            "id": "n817qyu",
                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n817qyu/",
                                                            "body": "Do it. Once their github actions stabilize, I'll have that too.  Ask any model anywhere anytime. I like it.",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "acoliver",
                                                            "replies": [
                                                                {
                                                                    "id": "n819ptz",
                                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n819ptz/",
                                                                    "body": "!remind me 4 days \n\nGot an exam coming up but after that I’ll be happy to :)",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "Still-Ad3045",
                                                                    "replies": [
                                                                        {
                                                                            "id": "n819tzf",
                                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n819tzf/",
                                                                            "body": "I will be messaging you in 4 days on [**2025-08-15 01:01:11 UTC**](http://www.wolframalpha.com/input/?i=2025-08-15%2001:01:11%20UTC%20To%20Local%20Time) to remind you of [**this link**](https://www.reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n819ptz/?context=3)\n\n[**CLICK THIS LINK**](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=Reminder&message=%5Bhttps%3A%2F%2Fwww.reddit.com%2Fr%2FChatGPTCoding%2Fcomments%2F1mkbkiv%2Fgpt5_in_openai_codex_is_great%2Fn819ptz%2F%5D%0A%0ARemindMe%21%202025-08-15%2001%3A01%3A11%20UTC) to send a PM to also be reminded and to reduce spam.\n\n^(Parent commenter can ) [^(delete this message to hide from others.)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=Delete%20Comment&message=Delete%21%201mkbkiv)\n\n*****\n\n|[^(Info)](https://www.reddit.com/r/RemindMeBot/comments/e1bko7/remindmebot_info_v21/)|[^(Custom)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=Reminder&message=%5BLink%20or%20message%20inside%20square%20brackets%5D%0A%0ARemindMe%21%20Time%20period%20here)|[^(Your Reminders)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=List%20Of%20Reminders&message=MyReminders%21)|[^(Feedback)](https://www.reddit.com/message/compose/?to=Watchful1&subject=RemindMeBot%20Feedback)|\n|-|-|-|-|",
                                                                            "depth": 6,
                                                                            "score": 1,
                                                                            "author": "RemindMeBot",
                                                                            "replies": [],
                                                                            "created_utc": "2025-08-11T01:01:54+00:00"
                                                                        },
                                                                        {
                                                                            "id": "n9fdhia",
                                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n9fdhia/",
                                                                            "body": "You make any progress on this? That would be sick af",
                                                                            "depth": 6,
                                                                            "score": 1,
                                                                            "author": "AreWeNotDoinPhrasing",
                                                                            "replies": [],
                                                                            "created_utc": "2025-08-18T22:05:44+00:00"
                                                                        }
                                                                    ],
                                                                    "created_utc": "2025-08-11T01:01:11+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2025-08-11T00:49:10+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-08-11T00:27:12+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-08T14:53:20+00:00"
                                        },
                                        {
                                            "id": "n8e5y4k",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n8e5y4k/",
                                            "body": "In what ways?  I was using sonnet and opus because GPT was trash for my needs, but Codex seems to have cut down in compiler errors SIGNIFICANTLY.  I just started using it today tho.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "modernDayKing",
                                            "replies": [],
                                            "created_utc": "2025-08-13T01:25:17+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T12:05:00+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T02:12:59+00:00"
                        },
                        {
                            "id": "n7hkch5",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hkch5/",
                            "body": "Read my mind friend. Diving in!",
                            "depth": 0,
                            "score": 3,
                            "author": "kcabrams",
                            "replies": [],
                            "created_utc": "2025-08-07T21:00:14+00:00"
                        },
                        {
                            "id": "n7j15gu",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j15gu/",
                            "body": "Well, it seems at least on par with Claude. Gonna cancel my CC  Max next month, since I have pro already.",
                            "depth": 0,
                            "score": 3,
                            "author": "Freed4ever",
                            "replies": [],
                            "created_utc": "2025-08-08T01:57:57+00:00"
                        },
                        {
                            "id": "n7jok13",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7jok13/",
                            "body": "How much does it cost with API - say for an hour of hardcore coding? I feel like I’m using a lot with the Claude max and if I were to switch to API pricing I’d have to pay much more than 100 bucks a month which is my current plan. I definitely want to try codex now though",
                            "depth": 0,
                            "score": 3,
                            "author": "Reasonable_Ad_4930",
                            "replies": [
                                {
                                    "id": "n7mr49r",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7mr49r/",
                                    "body": "Yesterday for 2 hours of intensive vibe coding I payed 1.2 USD. Usually for similar work I pay to Claude 5 USD for Sonnet. For Opus it will cost fortune. Quality of gpt-5 in coding is definitely higher than Opus. So I have made my choice.",
                                    "depth": 1,
                                    "score": 4,
                                    "author": "AnalystAI",
                                    "replies": [],
                                    "created_utc": "2025-08-08T17:01:54+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T04:35:47+00:00"
                        },
                        {
                            "id": "n7k4l1b",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7k4l1b/",
                            "body": "Interesting, Claude code is included in my monthly subscription. Not sure if they include it in ChatGPT pro subs, if they do, then it will be a no-brainer, it's a really good model, and OpenAI offers way more in terms of images and voice apis.",
                            "depth": 0,
                            "score": 3,
                            "author": "[deleted]",
                            "replies": [
                                {
                                    "id": "n7k7xvs",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7k7xvs/",
                                    "body": "As of today, you can use your ChatGPT account for credits!",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "gpeal",
                                    "replies": [],
                                    "created_utc": "2025-08-08T07:21:44+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T06:51:25+00:00"
                        },
                        {
                            "id": "n7l4nbd",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l4nbd/",
                            "body": "how long before the rest of the already open source, free and paid features that have existed for months be added as a value adding feature?",
                            "depth": 0,
                            "score": 3,
                            "author": "Still-Ad3045",
                            "replies": [
                                {
                                    "id": "n7lgcr1",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lgcr1/",
                                    "body": "Just as soon as legal ensures they can make a mint on it without getting sued.",
                                    "depth": 1,
                                    "score": 2,
                                    "author": "LabGecko",
                                    "replies": [],
                                    "created_utc": "2025-08-08T13:13:34+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T12:04:20+00:00"
                        },
                        {
                            "id": "n7m4rt7",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7m4rt7/",
                            "body": "Can we use codex with plus",
                            "depth": 0,
                            "score": 3,
                            "author": "tradingtoolx",
                            "replies": [
                                {
                                    "id": "n7mc7i1",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7mc7i1/",
                                    "body": "Yes!",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "coylter",
                                    "replies": [],
                                    "created_utc": "2025-08-08T15:51:03+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T15:15:57+00:00"
                        },
                        {
                            "id": "n7hyg88",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hyg88/",
                            "body": "I wish codex integrated with gitlab as well as GitHub. I mean, I know I could also just have a sister origin to github but it’s annoying.",
                            "depth": 0,
                            "score": 4,
                            "author": "thunder-thumbs",
                            "replies": [
                                {
                                    "id": "n7l4vgu",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l4vgu/",
                                    "body": "yeah one day codex will reach the level of open source and paid options that haven been established for months.",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Still-Ad3045",
                                    "replies": [],
                                    "created_utc": "2025-08-08T12:05:49+00:00"
                                },
                                {
                                    "id": "n7jw2pm",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7jw2pm/",
                                    "body": "Keep in mind Microsoft is a massive shareholder in OpenAI and also owns Github. ",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Frodolas",
                                    "replies": [],
                                    "created_utc": "2025-08-08T05:36:03+00:00"
                                },
                                {
                                    "id": "n7ioufh",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ioufh/",
                                    "body": "What is gitlab for? I’m looking but don’t understand. Played with codex for the first time just now, and it seems like iterating and testing would be somewhat less fluid than say claude code because it pushes changes to a fit instead of a live environment.",
                                    "depth": 1,
                                    "score": -4,
                                    "author": "dalhaze",
                                    "replies": [
                                        {
                                            "id": "n7ng44z",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ng44z/",
                                            "body": "Gitlab is a younger, sick brother of github. Some loves him out of misery.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "raiffuvar",
                                            "replies": [],
                                            "created_utc": "2025-08-08T19:01:12+00:00"
                                        },
                                        {
                                            "id": "n7ofhxn",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ofhxn/",
                                            "body": "a lot of enterprises prefer gitlab because it's all wrapped in a single cli/tool",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "ChiefExec",
                                            "replies": [],
                                            "created_utc": "2025-08-08T22:00:35+00:00"
                                        },
                                        {
                                            "id": "neu8m92",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/neu8m92/",
                                            "body": "Gitlab is usually picked for an on premise deployment.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "darksparkone",
                                            "replies": [],
                                            "created_utc": "2025-09-18T05:40:23+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T00:44:29+00:00"
                                }
                            ],
                            "created_utc": "2025-08-07T22:13:33+00:00"
                        },
                        {
                            "id": "n7irc03",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7irc03/",
                            "body": "Is codex CLI finally included in the Pro plan? Don’t know if they announced it today. ",
                            "depth": 0,
                            "score": 3,
                            "author": "jstanaway",
                            "replies": [
                                {
                                    "id": "n7j0xer",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j0xer/",
                                    "body": "Yes",
                                    "depth": 1,
                                    "score": 4,
                                    "author": "Freed4ever",
                                    "replies": [
                                        {
                                            "id": "n7jcsib",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7jcsib/",
                                            "body": "isn’t codex cloud version only ? plz explain don’t understand",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "passionate123",
                                            "replies": [
                                                {
                                                    "id": "n7jft58",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7jft58/",
                                                    "body": "Nope, there's a codex cli version as well, and in so far, it seems to be on par with CC, mind you, it's only been an hour playing with it. Search for OpenAI codex cli, you will find its Github repos with instructions",
                                                    "depth": 3,
                                                    "score": 4,
                                                    "author": "Freed4ever",
                                                    "replies": [
                                                        {
                                                            "id": "n7ji8km",
                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ji8km/",
                                                            "body": "thank you.. didn’t know that we can use codex cli with chatgpt subscription",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "passionate123",
                                                            "replies": [
                                                                {
                                                                    "id": "n7jj17b",
                                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7jj17b/",
                                                                    "body": "Well, that's new today.",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "Freed4ever",
                                                                    "replies": [],
                                                                    "created_utc": "2025-08-08T03:55:06+00:00"
                                                                },
                                                                {
                                                                    "id": "n7l2ppa",
                                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l2ppa/",
                                                                    "body": "Could you access?",
                                                                    "depth": 5,
                                                                    "score": 1,
                                                                    "author": "Agitated_Thanks_879",
                                                                    "replies": [],
                                                                    "created_utc": "2025-08-08T11:51:06+00:00"
                                                                }
                                                            ],
                                                            "created_utc": "2025-08-08T03:49:29+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-08-08T03:32:23+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-08T03:11:52+00:00"
                                        },
                                        {
                                            "id": "n7k76of",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7k76of/",
                                            "body": "What are the limits?",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Singularity-42",
                                            "replies": [
                                                {
                                                    "id": "n7l5z3y",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l5z3y/",
                                                    "body": "It's unclear what the limit is. The only thing they say is pro should be able to use it for coding the whole 8hrs day, unless they run multiple windows/projects at the same time like a mad man.",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "Freed4ever",
                                                    "replies": [],
                                                    "created_utc": "2025-08-08T12:12:45+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-08T07:14:49+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T01:56:36+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T00:58:56+00:00"
                        },
                        {
                            "id": "n7kalmm",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7kalmm/",
                            "body": "just been using with my plus sub an used one of the example prompts from the openai git \"Carefully review this repo, and propose 3 high impact well-scoped PRs\"\n\nVery impressive outputs for my project. I also tested the same prompt in the same project using gemini 2.5 pro and CC just out pure curiosity of the outputs. As you'd expect, all totally different PR suggestions but all great considerations.\n\nI will say I hit the GPT5 limit via codex and my plus account pretty quickly, probably within an hour I'd say \"\n\n    7093324 tokens used   43% context left",
                            "depth": 0,
                            "score": 2,
                            "author": "christof21",
                            "replies": [],
                            "created_utc": "2025-08-08T07:47:04+00:00"
                        },
                        {
                            "id": "n7kiet8",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7kiet8/",
                            "body": "How are you specifying the model in Codex? I tried using codex -m and it doesn't recognize 5 as a valid model.",
                            "depth": 0,
                            "score": 2,
                            "author": "Snottord",
                            "replies": [
                                {
                                    "id": "n7l4euz",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7l4euz/",
                                    "body": "Here's the format  \n  \ncodex -m gpt-5\n\nThis will show all your available models if your key is in $OPENAI\\_API\\_KEY:\n\ncurl -s -H \"Authorization: Bearer $OPENAI\\_API\\_KEY\" [https://api.openai.com/v1/models](https://api.openai.com/v1/models) | jq -r '.data\\[\\].id' | grep -Ev '\\[0-9\\]{4}-\\[0-9\\]{2}-\\[0-9\\]{2}' | sort -u",
                                    "depth": 1,
                                    "score": 3,
                                    "author": "dndiyguy",
                                    "replies": [
                                        {
                                            "id": "n7lhadw",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lhadw/",
                                            "body": "Amazing. Thank you!",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "Snottord",
                                            "replies": [],
                                            "created_utc": "2025-08-08T13:18:41+00:00"
                                        },
                                        {
                                            "id": "n7yumsc",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7yumsc/",
                                            "body": "I logged in via \"OpenAI account\" not with API key. How can I verify I have selected a specific model? \n\nBecause it is accepting any model name like \"codex -m gpt-53333\". \n\nI asked \"What model you are using?\" and it replied \".... I’m an OpenAI G\n\nPT‑4‑class assistant ....\".",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "RageshAntony",
                                            "replies": [],
                                            "created_utc": "2025-08-10T17:02:53+00:00"
                                        },
                                        {
                                            "id": "n84wfp6",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n84wfp6/",
                                            "body": "Im puzzled. The curl command returned all the models, which means the api key is being loaded ok. Then I ran codex -m gpt-5 and the status showed:   \n/status  \nWorkspace  \nPath: \\~/Sites/anibal5/gg  \nApproval Mode: on-request\n\nSandbox: workspace-write  \nModel  \nName: gpt-5  \nProvider: OpenAI  \nReasoning Effort: Medium   \nReasoning Summaries: Auto\n\nToken Usage  \nInput: 0  \nOutput: 0  \nTotal: 0  \n  \nis it loading the api key? as Im keep getting this dreadfull error after a couple of seconds: 🖐 stream disconnected before completion: Rate limit reached for gpt-5 in organization org-FphMblahblahblabh on tokens per min (TPM): Limit 30000, Used 27833, Requested 10706. Please try again in 17.078s. Visit [https://platform.openai.com/account/rate-limits](https://platform.openai.com/account/rate-limits) to learn more.",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "anibalin",
                                            "replies": [],
                                            "created_utc": "2025-08-11T16:33:48+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T12:02:45+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T09:02:14+00:00"
                        },
                        {
                            "id": "n7ksn9c",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ksn9c/",
                            "body": "This is maybe a stupid question but I can’t really figure it out after looking at the ChatGPT pricing page - is Codex included in the $20 ChatGPT plus plan? Or do you have to do Pro?",
                            "depth": 0,
                            "score": 2,
                            "author": "[deleted]",
                            "replies": [],
                            "created_utc": "2025-08-08T10:35:37+00:00"
                        },
                        {
                            "id": "n7nllzd",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7nllzd/",
                            "body": "With the new subscription-tier offering, I definitely need to check this out. I’m spending 8-10 hours a day with Claude Code Max 20x and *very* interested to try GPT5 head to head with their flat-rate plan.\n\nHas anyone done a head to head on the Codex versus Claude Code from the “CLI” standpoint (e.g. not a model to model comparison but a CLI feature comparison… can you use it like a Unix utility, does it putout stream-json, etc.)",
                            "depth": 0,
                            "score": 2,
                            "author": "lightsd",
                            "replies": [],
                            "created_utc": "2025-08-08T19:28:28+00:00"
                        },
                        {
                            "id": "n7p2c3x",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7p2c3x/",
                            "body": "Tried it today. It got stuck on some simple ESM issue. Seems a bit overly hyped.",
                            "depth": 0,
                            "score": 2,
                            "author": "nerdswithattitude",
                            "replies": [],
                            "created_utc": "2025-08-09T00:11:01+00:00"
                        },
                        {
                            "id": "n7ii0ij",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ii0ij/",
                            "body": "Just spent 1 hour with GPT-5 IN API LLM coding - Cline\n\n  \nIts good.",
                            "depth": 0,
                            "score": 2,
                            "author": "IamJustdoingit",
                            "replies": [],
                            "created_utc": "2025-08-08T00:04:02+00:00"
                        },
                        {
                            "id": "n7k8si0",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7k8si0/",
                            "body": "No screenshots lmao? I'll take this post as an ad then.",
                            "depth": 0,
                            "score": 1,
                            "author": "piponwa",
                            "replies": [],
                            "created_utc": "2025-08-08T07:29:49+00:00"
                        },
                        {
                            "id": "n7kslia",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7kslia/",
                            "body": "why is codex so awkward to set up compared to Claude Code? They could code a more CC-like approach to CLI coding in a day.",
                            "depth": 0,
                            "score": 1,
                            "author": "Competitive-Hat-5182",
                            "replies": [],
                            "created_utc": "2025-08-08T10:35:11+00:00"
                        },
                        {
                            "id": "n7lzjkh",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lzjkh/",
                            "body": "If you want a more claude-code like experience check out [https://github.com/acoliver/llxprt-code](https://github.com/acoliver/llxprt-code) .   \nI forked Gemini-Cli and made it multi-provider, added claude like todo lists and other features. Codex is great but sometimes you hit the wall with it and want more or at least I did. \n\n    npm install -g @vybestack/llxprt-code",
                            "depth": 0,
                            "score": 1,
                            "author": "acoliver",
                            "replies": [],
                            "created_utc": "2025-08-08T14:51:16+00:00"
                        },
                        {
                            "id": "n7ob7hj",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ob7hj/",
                            "body": "Since I’m a little bit new to the party, excuse me my silly questions. Vibe Coding means I connect my GitHub repo with OpenAI Codex, I am prompting my requirements for the software and Codex does the job?",
                            "depth": 0,
                            "score": 1,
                            "author": "highasthedn",
                            "replies": [],
                            "created_utc": "2025-08-08T21:37:32+00:00"
                        },
                        {
                            "id": "n7ohj2g",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ohj2g/",
                            "body": "The codex uses the gpt4-codex model not gpt5 although they could have updated it slightly",
                            "depth": 0,
                            "score": 1,
                            "author": "m3kw",
                            "replies": [],
                            "created_utc": "2025-08-08T22:11:54+00:00"
                        },
                        {
                            "id": "n7pkry7",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7pkry7/",
                            "body": "“It’s much better than Cats. I’m going to see it again and again”",
                            "depth": 0,
                            "score": 1,
                            "author": "marcopaulodirect",
                            "replies": [],
                            "created_utc": "2025-08-09T02:03:41+00:00"
                        },
                        {
                            "id": "n7rxwxy",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7rxwxy/",
                            "body": "actually they say they still use o3 in Codex  \n[https://platform.openai.com/docs/codex/overview](https://platform.openai.com/docs/codex/overview)",
                            "depth": 0,
                            "score": 1,
                            "author": "Randomizer667",
                            "replies": [
                                {
                                    "id": "n7s72g2",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7s72g2/",
                                    "body": "Codex says it is using GPT-5 ;-)",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "Responsible-Newt9241",
                                    "replies": [],
                                    "created_utc": "2025-08-09T14:40:59+00:00"
                                }
                            ],
                            "created_utc": "2025-08-09T13:47:17+00:00"
                        },
                        {
                            "id": "n8232tz",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n8232tz/",
                            "body": "Codex for web/ios does not use gpt5",
                            "depth": 0,
                            "score": 1,
                            "author": "m3kw",
                            "replies": [],
                            "created_utc": "2025-08-11T04:20:13+00:00"
                        },
                        {
                            "id": "n88sw7t",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n88sw7t/",
                            "body": "I also want to try Codex CLI with Plus plan but do not understand  token  limits. Are they close to Claude Pro?",
                            "depth": 0,
                            "score": 1,
                            "author": "SensitiveWorldliness",
                            "replies": [],
                            "created_utc": "2025-08-12T06:06:47+00:00"
                        },
                        {
                            "id": "neee7og",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/neee7og/",
                            "body": "Welp now I need to learn how to use this",
                            "depth": 0,
                            "score": 1,
                            "author": "Fstr21",
                            "replies": [],
                            "created_utc": "2025-09-15T19:30:36+00:00"
                        },
                        {
                            "id": "netr713",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/netr713/",
                            "body": "I've made permanent switch - it's an order of magnitude ahead in code quality. Still waiting for more features to ship (like subagents) but bravo to the OpenAI team. They're back on top.",
                            "depth": 0,
                            "score": 1,
                            "author": "[deleted]",
                            "replies": [],
                            "created_utc": "2025-09-18T03:25:50+00:00"
                        },
                        {
                            "id": "netyy9t",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/netyy9t/",
                            "body": "https://preview.redd.it/amijvc3xnupf1.png?width=500&format=png&auto=webp&s=c422b273ca9225b7daed6524b8e4d1139d01de68\n\nIt's trash.",
                            "depth": 0,
                            "score": 1,
                            "author": "digitalskyline",
                            "replies": [],
                            "created_utc": "2025-09-18T04:21:27+00:00"
                        },
                        {
                            "id": "n7hn4ro",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hn4ro/",
                            "body": "Whats the limits? - talking about the new way of using codex cli with your subscription with no api key",
                            "depth": 0,
                            "score": 1,
                            "author": "__Loot__",
                            "replies": [
                                {
                                    "id": "n7hq3fd",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hq3fd/",
                                    "body": "Your money, it’s pay-as-you-go",
                                    "depth": 1,
                                    "score": 1,
                                    "author": "AppointmentBoth4871",
                                    "replies": [
                                        {
                                            "id": "n7hqj78",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hqj78/",
                                            "body": "Look at my edit",
                                            "depth": 2,
                                            "score": 0,
                                            "author": "__Loot__",
                                            "replies": [
                                                {
                                                    "id": "n7hqzuf",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hqzuf/",
                                                    "body": "Yep sorry, when I used it last time it was available only via api key",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "AppointmentBoth4871",
                                                    "replies": [
                                                        {
                                                            "id": "n7hrbgr",
                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hrbgr/",
                                                            "body": "Np i just found out my self id drop 200 if I know the usage limits",
                                                            "depth": 4,
                                                            "score": 1,
                                                            "author": "__Loot__",
                                                            "replies": [],
                                                            "created_utc": "2025-08-07T21:35:43+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-08-07T21:34:02+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-07T21:31:39+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-07T21:29:24+00:00"
                                },
                                {
                                    "id": "n7hptz0",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hptz0/",
                                    "body": "I use API KEY, so I have no limits",
                                    "depth": 1,
                                    "score": -1,
                                    "author": "AnalystAI",
                                    "replies": [
                                        {
                                            "id": "n7hq4uu",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hq4uu/",
                                            "body": "Im talking about the new way to use codex cli with your subscription",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "__Loot__",
                                            "replies": [
                                                {
                                                    "id": "n7hwjqr",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hwjqr/",
                                                    "body": "Is that available? Source?",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "stryderjzw",
                                                    "replies": [
                                                        {
                                                            "id": "n7iakni",
                                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7iakni/",
                                                            "body": "https://www.reddit.com/r/ChatGPTCoding/s/74feFYjTCF",
                                                            "depth": 4,
                                                            "score": 2,
                                                            "author": "__Loot__",
                                                            "replies": [],
                                                            "created_utc": "2025-08-07T23:21:13+00:00"
                                                        }
                                                    ],
                                                    "created_utc": "2025-08-07T22:03:19+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-07T21:29:36+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-07T21:28:04+00:00"
                                }
                            ],
                            "created_utc": "2025-08-07T21:14:12+00:00"
                        },
                        {
                            "id": "n7hxbia",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7hxbia/",
                            "body": "anyway to use it via the 20 sub? or is it only pay as you go",
                            "depth": 0,
                            "score": 1,
                            "author": "cbusmatty",
                            "replies": [
                                {
                                    "id": "n7ia4sp",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ia4sp/",
                                    "body": "You can use it like Claude code now with your subscription",
                                    "depth": 1,
                                    "score": 5,
                                    "author": "__Loot__",
                                    "replies": [],
                                    "created_utc": "2025-08-07T23:18:39+00:00"
                                }
                            ],
                            "created_utc": "2025-08-07T22:07:28+00:00"
                        },
                        {
                            "id": "n7ip3fo",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7ip3fo/",
                            "body": "is it better than claude? what about gemini?",
                            "depth": 0,
                            "score": 1,
                            "author": "SeaBuilder9067",
                            "replies": [
                                {
                                    "id": "n7k41g1",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7k41g1/",
                                    "body": "It is better than Claude, which was better than Gemini in coding.",
                                    "depth": 1,
                                    "score": -2,
                                    "author": "AnalystAI",
                                    "replies": [
                                        {
                                            "id": "nayoxji",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/nayoxji/",
                                            "body": "Not sure why this is getting downvoted. I've found Codex better than Claude for sorting certain problems I've had. Sure the app isn't as polished but in terms of getting things done, Codex is working nicely for me so far.",
                                            "depth": 2,
                                            "score": 2,
                                            "author": "sofarfarso",
                                            "replies": [],
                                            "created_utc": "2025-08-27T15:27:24+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T06:46:35+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T00:46:00+00:00"
                        },
                        {
                            "id": "n7j6jp2",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j6jp2/",
                            "body": "This reminds me I need to cancel my Codex account",
                            "depth": 0,
                            "score": 0,
                            "author": "Bankster88",
                            "replies": [
                                {
                                    "id": "n7muad1",
                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7muad1/",
                                    "body": "Good thing you posted that here on Reddit to let us all know, instead of, you know, actually just canceling it.",
                                    "depth": 1,
                                    "score": 4,
                                    "author": "damonous",
                                    "replies": [
                                        {
                                            "id": "n7nff9f",
                                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7nff9f/",
                                            "body": "Every little bit helps",
                                            "depth": 2,
                                            "score": 1,
                                            "author": "Bankster88",
                                            "replies": [
                                                {
                                                    "id": "n7usdoz",
                                                    "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7usdoz/",
                                                    "body": "Man, the amount of accounts I need to cancel, there's so many tools right now that keeping track of them in a spreadsheet/notion/notebook whatever, is still not going to keep me up to date with everything I mess around with, this is our personal problems though we should probably be responsible. Oh well, I know many of you are curious about things too! that's why we're here lol",
                                                    "depth": 3,
                                                    "score": 1,
                                                    "author": "pop-lock",
                                                    "replies": [],
                                                    "created_utc": "2025-08-09T23:24:30+00:00"
                                                }
                                            ],
                                            "created_utc": "2025-08-08T18:57:52+00:00"
                                        }
                                    ],
                                    "created_utc": "2025-08-08T17:16:44+00:00"
                                }
                            ],
                            "created_utc": "2025-08-08T02:31:18+00:00"
                        },
                        {
                            "id": "n7j9kbx",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j9kbx/",
                            "body": "Great. Mind sharing your this take on r/vibecodecamp",
                            "depth": 0,
                            "score": 0,
                            "author": "kirrttiraj",
                            "replies": [],
                            "created_utc": "2025-08-08T02:50:34+00:00"
                        },
                        {
                            "id": "n7j5buz",
                            "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7j5buz/",
                            "body": "why did you put a comma after believe?",
                            "depth": 0,
                            "score": -2,
                            "author": "djyroc",
                            "replies": [],
                            "created_utc": "2025-08-08T02:23:43+00:00"
                        }
                    ],
                    "permalink": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/"
                }
            ],
            "summary": "Users discuss integrating OpenAI models via API and CLI, with mixed experiences on model selection, rate limits, and cost. Some explore alternatives like Gemini and multi-provider tools. Google Vertex Search is not directly mentioned in the provided data.",
            "sentiment": "mixed",
            "pain_points": [
                {
                    "type": "ux",
                    "issue": "Difficulty selecting specific OpenAI models via CLI",
                    "description": "Users struggle to specify and verify which model (e.g., gpt-5) is being used in Codex CLI, leading to confusion about API key usage and model selection.",
                    "example_quote": {
                        "id": null,
                        "url": null,
                        "text": "I logged in via \"OpenAI account\" not with API key. How can I verify I have selected a specific model?\nBecause it is accepting any model name like \"codex -m gpt-53333\".\nI asked \"What model you are using?\" and it replied \".... I’m an OpenAI GPT‑4‑class assistant ....\".",
                        "score": null,
                        "author": null
                    },
                    "system_actions": [
                        {
                            "title": "Implement clearer model selection in CLI",
                            "validation": "This directly addresses the user's confusion and provides a reliable way to confirm model usage.",
                            "recommendation": "Update CLI documentation and add a `--model` flag with validation to ensure correct model selection.",
                            "proposed_solution": "Add explicit prompts and commands to verify and set the model, reducing ambiguity and improving user confidence."
                        }
                    ],
                    "why_this_is_pain": "This friction slows down development and creates uncertainty about billing and model capabilities, impacting user trust and efficiency.",
                    "user_suggested_solutions": [
                        {
                            "solution": "Use the `/status` and `/model` commands in the CLI to check active model and settings.",
                            "example_quote": {
                                "id": null,
                                "url": null,
                                "text": "The `/`status` command will show that info. Also, you can select a model with the `/`model` command. Just type these in as if they would prompts.",
                                "score": null,
                                "author": null
                            }
                        }
                    ]
                },
                {
                    "type": "financial",
                    "issue": "Rate limiting and cost uncertainty",
                    "description": "Users encounter unexpected rate limits (e.g., 30,000 TPM) and unclear pricing models when using OpenAI's API, impacting beta testing budgets.",
                    "example_quote": {
                        "id": "n84wfp6",
                        "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n84wfp6/",
                        "text": "stream disconnected before completion: Rate limit reached for gpt-5 in organization org-FphMblahblahblabh on tokens per min (TPM): Limit 30000, Used 27833, Requested 10706. Please try again in 17.078s.",
                        "score": 1,
                        "author": "anibalin"
                    },
                    "system_actions": [
                        {
                            "title": "Optimize API usage for beta testing",
                            "validation": "This reduces the frequency of API requests, staying within limits and lowering expenses.",
                            "recommendation": "Add a rate-limiting middleware and request batching in the backend to handle 100 users efficiently.",
                            "proposed_solution": "Implement caching, batching, and rate-limit management to reduce API calls and costs."
                        }
                    ],
                    "why_this_is_pain": "Unpredictable costs and limits can derail small-scale projects, making it difficult to plan for 100 beta users without overspending.",
                    "user_suggested_solutions": [
                        {
                            "solution": "Leverage subscription-based plans (e.g., Plus) to access higher limits and predictable costs.",
                            "example_quote": {
                                "id": "n7qnwhf",
                                "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7qnwhf/",
                                "text": "You can use your ChatGPT subscription with cli Codex now.",
                                "score": 5,
                                "author": "leynosncs"
                            }
                        }
                    ]
                },
                {
                    "type": "technical",
                    "issue": "Lack of multi-provider support in native tools",
                    "description": "Users seek tools that can switch between AI providers (e.g., OpenAI, Gemini) seamlessly, but current options are siloed.",
                    "example_quote": {
                        "id": null,
                        "url": null,
                        "text": "I forked gemini-cli made it mulit-provider and added claude-style todo lists. Works great with GPT-5.\nhttps://github.com/acoliver/llxprt-code",
                        "score": null,
                        "author": null
                    },
                    "system_actions": [
                        {
                            "title": "Integrate multi-provider capabilities",
                            "validation": "This provides a unified interface, reducing integration overhead and enabling provider flexibility.",
                            "recommendation": "Build a provider-agnostic abstraction layer in the FastAPI backend to support multiple AI services.",
                            "proposed_solution": "Develop or integrate a backend that abstracts provider selection, allowing easy switching between OpenAI, Gemini, etc."
                        }
                    ],
                    "why_this_is_pain": "Vendor lock-in limits flexibility and forces users to maintain multiple toolchains, increasing complexity.",
                    "user_suggested_solutions": [
                        {
                            "solution": "Adopt or contribute to multi-provider CLI tools like llxprt-code.",
                            "example_quote": {
                                "id": "n7lzzh4",
                                "url": "https://reddit.com/r/ChatGPTCoding/comments/1mkbkiv/gpt5_in_openai_codex_is_great/n7lzzh4/",
                                "text": "I forked gemini-cli made it mulit-provider and added claude-style todo lists. Works great with GPT-5.",
                                "score": 6,
                                "author": "acoliver"
                            }
                        }
                    ]
                }
            ],
            "signal_count": 11,
            "relevance_score": 75,
            "brands_mentioned": [
                "OpenAI",
                "Google",
                "Gemini"
            ],
            "demographic_signals": [
                "Developers",
                "AI enthusiasts",
                "SaaS builders"
            ]
        }
    ],
    "market_signals": {
        "emerging_topics": [
            "serverless deployment",
            "managed database services",
            "cost-effective VPS",
            "containerization",
            "AI provider integration",
            "Infrastructure as Code (IaC)"
        ],
        "brands_mentioned": [
            "AWS",
            "GCP",
            "Azure",
            "Supabase",
            "Render",
            "DigitalOcean",
            "Fly.io",
            "Heroku",
            "Vercel",
            "Neon",
            "Planetscale"
        ],
        "geographic_signals": [
            "US",
            "Europe",
            "India",
            "Global"
        ],
        "demographic_signals": [
            "startup founders",
            "developers",
            "backend engineers",
            "AI engineers",
            "full-stack developers",
            "ML engineers"
        ]
    },
    "meta": {
        "model": "sarvam-30b",
        "caveats": "Data is limited to Reddit posts and may not represent all deployment strategies or enterprise preferences. The analysis is based on general cloud provider discussions rather than specific infrastructure recommendations.",
        "confidence": "Low",
        "date_range": "2012-08-02T03:24:37+00:00 to 2026-03-03T08:30:31+00:00",
        "total_posts": 72,
        "total_comments": 1802
    },
    "created_at": "2026-03-16T07:14:01.784266+00:00"
}

// ── Config maps ──────────────────────────────────────────────────────────────
const sentimentConfig = {
    negative: { bg: 'bg-[var(--destructive-bg)]', text: 'text-[var(--destructive)]', dot: 'bg-[var(--destructive)]', label: 'Negative' },
    positive: { bg: 'bg-[var(--success-bg)]', text: 'text-[var(--success)]', dot: 'bg-[var(--success)]', label: 'Positive' },
    neutral: { bg: 'bg-[var(--surface-raised)]', text: 'text-[var(--text-muted)]', dot: 'bg-[var(--text-muted)]', label: 'Neutral' },
    mixed: { bg: 'bg-[var(--warning-bg)]', text: 'text-[var(--warning)]', dot: 'bg-[var(--warning)]', label: 'Mixed' },
};

const severityConfig = {
    financial: { bg: 'bg-[var(--destructive-bg)]', text: 'text-[var(--destructive)]' },
    technical: { bg: 'bg-[var(--warning-bg)]', text: 'text-[var(--warning)]' },
    social: { bg: 'bg-[var(--info-bg)]', text: 'text-[var(--info)]' },
    operational: { bg: 'bg-[var(--surface-raised)]', text: 'text-[var(--text-muted)]' },
    ux: { bg: 'bg-[var(--success-bg)]', text: 'text-[var(--success)]' },
};

const confidenceConfig = {
    High: 'text-[var(--success)]',
    Medium: 'text-[var(--warning)]',
    Low: 'text-[var(--destructive)]',
};

// ── Reusable atoms ───────────────────────────────────────────────────────────
const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const SentimentBadge = ({ sentiment, small = false }) => {
    const c = sentimentConfig[sentiment] ?? sentimentConfig.neutral;
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${small ? 'text-[10px]' : 'text-xs'} ${c.bg} ${c.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {c.label}
        </span>
    );
};

const Pill = ({ label, muted = false }) => (
    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium
        ${muted
            ? 'border-[var(--border-solid)] text-[var(--text-muted)]'
            : 'border-[var(--primary)] bg-[var(--info-bg)] text-[var(--primary)]'}`}>
        {label}
    </span>
);

const SectionLabel = ({ children }) => (
    <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]">{children}</p>
);

const Card = ({ children, className = '' }) => (
    <div className={`rounded-xl border border-[var(--border-solid)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] ${className}`}>
        {children}
    </div>
);

const QuoteBlock = ({ quote }) => {
    if (!quote) return null;
    return (
        <div className="mt-3 rounded-lg bg-[var(--surface-card)] p-3 border-l-2 border-[var(--primary)]">
            <p className="text-xs italic leading-relaxed text-[var(--text-muted)]">"{quote.text}"</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-[var(--text-muted)]">
                {quote.author && <span>u/{quote.author}</span>}
                {quote.score != null && <span>↑ {quote.score}</span>}
                {quote.id && <span className="font-mono">#{quote.id}</span>}
                {quote.url && (
                    <a href={quote.url} target="_blank" rel="noopener noreferrer"
                        className="text-[var(--primary)] hover:underline ml-auto">
                        View →
                    </a>
                )}
            </div>
        </div>
    );
};

// ── Pain Point Card ──────────────────────────────────────────────────────────
const PainPointCard = ({ pp }) => {
    const [expanded, setExpanded] = useState(false);
    const sc = severityConfig[pp.type] ?? severityConfig.operational;

    return (
        <div className="rounded-lg border border-[var(--border-solid)] bg-[var(--surface-card)] overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setExpanded(e => !e)}
                className="w-full text-left p-4 cursor-pointer hover:bg-[var(--surface-raised)] transition-colors"
            >
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="text-sm font-medium text-[var(--text-main)] flex-1">{pp.issue}</p>
                    <div className="flex shrink-0 flex-wrap gap-1.5 items-center">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${sc.bg} ${sc.text}`}>
                            {pp.type}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">
                            {expanded ? '▲' : '▼'}
                        </span>
                    </div>
                </div>
                <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">{pp.description}</p>
            </button>

            {/* Expanded */}
            {expanded && (
                <div className="px-4 pb-4 space-y-4 border-t border-[var(--border-solid)]">

                    {/* Why this is a pain */}
                    {pp.why_this_is_pain && (
                        <div className="pt-4">
                            <SectionLabel>Why This Is A Pain</SectionLabel>
                            <p className="text-xs leading-relaxed text-[var(--text-muted)]">{pp.why_this_is_pain}</p>
                        </div>
                    )}

                    {/* Example quote */}
                    {pp.example_quote && (
                        <div>
                            <SectionLabel>Example Quote</SectionLabel>
                            <QuoteBlock quote={pp.example_quote} />
                        </div>
                    )}

                    {/* User suggested solutions */}
                    {pp.user_suggested_solutions?.length > 0 && (
                        <div>
                            <SectionLabel>User-Suggested Solutions</SectionLabel>
                            <div className="space-y-3">
                                {pp.user_suggested_solutions.map((s, i) => (
                                    <div key={i} className="rounded-lg bg-[var(--surface)] border border-[var(--border-solid)] p-3">
                                        <div className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                                            <p className="text-xs text-[var(--text-main)]">{s.solution}</p>
                                        </div>
                                        {s.example_quote && <QuoteBlock quote={s.example_quote} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* System actions */}
                    {pp.system_actions?.length > 0 && (
                        <div>
                            <SectionLabel>System Actions</SectionLabel>
                            <div className="space-y-3">
                                {pp.system_actions.map((a, i) => (
                                    <div key={i} className="rounded-lg bg-[var(--surface)] border border-[var(--border-solid)] p-3 space-y-2">
                                        <p className="text-xs font-semibold text-[var(--text-main)]">{a.title}</p>
                                        {a.proposed_solution && (
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-0.5">Proposed Solution</p>
                                                <p className="text-xs text-[var(--text-muted)]">{a.proposed_solution}</p>
                                            </div>
                                        )}
                                        {a.validation && (
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-0.5">Validation</p>
                                                <p className="text-xs text-[var(--text-muted)]">{a.validation}</p>
                                            </div>
                                        )}
                                        {a.recommendation && (
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-0.5">Recommendation</p>
                                                <p className="text-xs text-[var(--text-muted)]">{a.recommendation}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// ── Main Page ────────────────────────────────────────────────────────────────
const SummaryPage = ({ data }) => {
    const [activeTheme, setActiveTheme] = useState(data.themes?.[0]?.id);
    const theme = data.themes?.find(t => t.id === activeTheme);

    return (
        <div className="min-h-screen bg-[var(--background)] px-6 py-10 lg:px-10">

            {/* ── Header ── */}
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                        Research Summary
                    </p>
                    <h1 className="text-2xl font-semibold leading-snug tracking-tight text-[var(--text-main)]">
                        {data.query}
                    </h1>
                    <p className="mt-1.5 text-xs text-[var(--text-muted)]">{data.subreddit}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <SentimentBadge sentiment={data.overall_sentiment} />
                    <p className="font-mono text-[11px] text-[var(--text-muted)]">
                        Analyzed: {formatDate(data.analyzed_at)}
                    </p>
                </div>
            </div>

            {/* ── Stats ── */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                    { label: 'Total Signals', value: data.total_signals },
                    { label: 'Themes', value: data.themes?.length ?? 0 },
                    { label: 'Posts Analyzed', value: data.meta?.total_posts },
                    { label: 'Comments', value: data.meta?.total_comments },
                ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl border border-[var(--border-solid)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)]">
                        <p className="text-2xl font-semibold text-[var(--text-main)]">{value ?? '—'}</p>
                        <p className="mt-0.5 text-xs text-[var(--text-muted)]">{label}</p>
                    </div>
                ))}
            </div>

            {/* ── Executive Summary ── */}
            <Card className="mb-6">
                <SectionLabel>Executive Summary</SectionLabel>
                <p className="leading-relaxed text-sm text-[var(--text-main)]">{data.executive_summary}</p>
            </Card>

            {/* ── Themes ── */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start">

                {/* Theme nav */}
                <div className="flex shrink-0 flex-col gap-2 lg:w-64">
                    <p className="px-1 text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]">Themes</p>
                    {data.themes?.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTheme(t.id)}
                            className={`flex w-full cursor-pointer flex-col items-start rounded-xl border px-4 py-3 text-left transition-all duration-150
                                ${activeTheme === t.id
                                    ? 'border-[var(--primary)] bg-[var(--info-bg)]'
                                    : 'border-[var(--border-solid)] bg-[var(--surface)] hover:bg-[var(--surface-card)]'}`}
                        >
                            <span className={`text-xs font-medium leading-snug ${activeTheme === t.id ? 'text-[var(--primary)]' : 'text-[var(--text-main)]'}`}>
                                {t.title}
                            </span>
                            <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5">
                                <span className="font-mono text-[10px] text-[var(--text-muted)]">{t.signal_count} signals</span>
                                <span className="font-mono text-[10px] text-[var(--text-muted)]">{t.relevance_score}% relevance</span>
                            </div>
                            <div className="mt-1.5">
                                <SentimentBadge sentiment={t.sentiment} small />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Theme detail */}
                {theme && (
                    <div className="min-w-0 flex-1 space-y-4">

                        {/* Overview */}
                        <Card>
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-base font-semibold text-[var(--text-main)]">{theme.title}</h2>
                                    <p className="mt-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                                        {theme.id} · {theme.signal_count} signals · {theme.relevance_score}% relevance
                                    </p>
                                </div>
                                <SentimentBadge sentiment={theme.sentiment} small />
                            </div>
                            <p className="text-sm leading-relaxed text-[var(--text-muted)]">{theme.summary}</p>

                            {/* Brands */}
                            {theme.brands_mentioned?.length > 0 && (
                                <div className="mt-4">
                                    <SectionLabel>Brands Mentioned</SectionLabel>
                                    <div className="flex flex-wrap gap-1.5">
                                        {theme.brands_mentioned.map(b => <Pill key={b} label={b} />)}
                                    </div>
                                </div>
                            )}

                            {/* Demographics */}
                            {theme.demographic_signals?.length > 0 && (
                                <div className="mt-4">
                                    <SectionLabel>Demographic Signals</SectionLabel>
                                    <div className="flex flex-wrap gap-1.5">
                                        {theme.demographic_signals.map(d => <Pill key={d} label={d} muted />)}
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Pain Points — now expandable with nested data */}
                        {theme.pain_points?.length > 0 && (
                            <Card>
                                <SectionLabel>Pain Points ({theme.pain_points.length})</SectionLabel>
                                <div className="space-y-3">
                                    {theme.pain_points.map((pp, i) => (
                                        <PainPointCard key={i} pp={pp} />
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Quotes */}
                        {theme.quotes?.length > 0 && (
                            <Card>
                                <SectionLabel>User Quotes</SectionLabel>
                                <div className="space-y-3">
                                    {theme.quotes.map((q, i) => (
                                        <div key={i} className="rounded-lg bg-[var(--surface-card)] p-4">
                                            <p className="text-sm leading-relaxed text-[var(--text-main)]">"{q.text}"</p>
                                            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--text-muted)]">
                                                    {q.author && <span>u/{q.author}</span>}
                                                    {q.score != null && <span>↑ {q.score}</span>}
                                                    {q.id && <span className="font-mono">#{q.id}</span>}
                                                </div>
                                                {q.url && (
                                                    <a href={q.url} target="_blank" rel="noopener noreferrer"
                                                        className="text-[11px] text-[var(--primary)] hover:underline">
                                                        View on Reddit →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Sources */}
                        {theme.sources?.length > 0 && (
                            <Card>
                                <SectionLabel>Sources</SectionLabel>
                                <div className="space-y-3">
                                    {theme.sources.map((src) => (
                                        <div key={src.id} className="rounded-lg border border-[var(--border-solid)] bg-[var(--surface-card)] p-4">
                                            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize
                                                        ${src.kind === 'post'
                                                            ? 'bg-[var(--info-bg)] text-[var(--info)]'
                                                            : 'bg-[var(--warning-bg)] text-[var(--warning)]'}`}>
                                                        {src.kind}
                                                    </span>
                                                    <span className="font-mono text-[11px] text-[var(--text-muted)]">#{src.id}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
                                                    {src.author && <span>u/{src.author}</span>}
                                                    {src.score != null && <span>↑ {src.score}</span>}
                                                    <span>{formatDate(src.created)}</span>
                                                </div>
                                            </div>
                                            {src.preview && (
                                                <p className="text-xs leading-relaxed text-[var(--text-muted)]">{src.preview}</p>
                                            )}
                                            {src.permalink && (
                                                <a href={src.permalink} target="_blank" rel="noopener noreferrer"
                                                    className="mt-2 block text-[11px] text-[var(--primary)] hover:underline truncate">
                                                    {src.permalink}
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>
                )}
            </div>

            {/* ── Market Signals ── */}
            {data.market_signals && (
                <Card className="mb-6">
                    <SectionLabel>Market Signals</SectionLabel>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Emerging Topics', items: data.market_signals.emerging_topics },
                            { label: 'Brands Mentioned', items: data.market_signals.brands_mentioned },
                            { label: 'Geographic Signals', items: data.market_signals.geographic_signals },
                            { label: 'Demographic Signals', items: data.market_signals.demographic_signals },
                        ].map(({ label, items }) => (
                            <div key={label}>
                                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]">{label}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {items?.map(item => <Pill key={item} label={item} muted />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* ── Meta ── */}
            {data.meta && (
                <Card>
                    <SectionLabel>Meta</SectionLabel>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Model</p>
                            <p className="mt-0.5 font-mono text-sm text-[var(--text-main)]">{data.meta.model}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Confidence</p>
                            <p className={`mt-0.5 text-sm font-medium ${confidenceConfig[data.meta.confidence] ?? ''}`}>
                                {data.meta.confidence}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Date Range</p>
                            <p className="mt-0.5 font-mono text-xs text-[var(--text-main)]">{data.meta.date_range}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Total Posts</p>
                            <p className="mt-0.5 text-sm font-semibold text-[var(--text-main)]">{data.meta.total_posts}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Total Comments</p>
                            <p className="mt-0.5 text-sm font-semibold text-[var(--text-main)]">{data.meta.total_comments}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Caveats</p>
                            <p className="mt-0.5 text-xs italic leading-relaxed text-[var(--text-muted)]">{data.meta.caveats}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default function Page() {
    return <SummaryPage data={STATIC_DATA} />;
}