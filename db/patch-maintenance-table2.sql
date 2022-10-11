-- You should not modify if this have pushed to Github, unless it does serious wrong with the db.
BEGIN TRANSACTION;

-- Just for someone who tested maintenance before (patch-maintenance-table.sql)
DROP TABLE IF EXISTS maintenance_status_page;
DROP TABLE IF EXISTS monitor_maintenance;
DROP TABLE IF EXISTS maintenance;
DROP TABLE IF EXISTS maintenance_timeslot;

-- maintenance
CREATE TABLE [maintenance] (
    [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [title] VARCHAR(150) NOT NULL,
    [description] TEXT NOT NULL,
    [user_id] INTEGER REFERENCES [user]([id]) ON DELETE SET NULL ON UPDATE CASCADE,
    [active] BOOLEAN NOT NULL DEFAULT 1,
    [strategy] VARCHAR(50) NOT NULL DEFAULT 'single',
    [start_date] DATETIME,
    [end_date] DATETIME,
    [start_time] TIME,
    [end_time] TIME,
    [weekdays] VARCHAR2(250) DEFAULT '[]',
    [days_of_month] TEXT DEFAULT '[]',
    [interval_day] INTEGER
);

CREATE INDEX [maintenance_user_id] ON [maintenance]([user_id]);

-- maintenance_status_page
CREATE TABLE maintenance_status_page (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    status_page_id INTEGER NOT NULL,
    maintenance_id INTEGER NOT NULL,
    CONSTRAINT FK_maintenance FOREIGN KEY (maintenance_id) REFERENCES maintenance (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_status_page FOREIGN KEY (status_page_id) REFERENCES status_page (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- maintenance_timeslot
CREATE TABLE [maintenance_timeslot] (
    [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [maintenance_id] INTEGER NOT NULL CONSTRAINT [FK_maintenance] REFERENCES [maintenance]([id]) ON DELETE CASCADE ON UPDATE CASCADE,
    [start_date] DATETIME NOT NULL,
    [end_date] DATETIME,
    [generated_next] BOOLEAN DEFAULT 0
);

-- monitor_maintenance
CREATE TABLE monitor_maintenance (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    monitor_id INTEGER NOT NULL,
    maintenance_id INTEGER NOT NULL,
    CONSTRAINT FK_maintenance FOREIGN KEY (maintenance_id) REFERENCES maintenance (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_monitor FOREIGN KEY (monitor_id) REFERENCES monitor (id) ON DELETE CASCADE ON UPDATE CASCADE
);

COMMIT;
