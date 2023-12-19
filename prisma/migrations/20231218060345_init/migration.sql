-- CreateTable
CREATE TABLE "Website" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "website_id" INTEGER NOT NULL,
    CONSTRAINT "PageView_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "Website" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_name" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "website_id" INTEGER NOT NULL,
    CONSTRAINT "AnalyticsEvent_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "Website" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
