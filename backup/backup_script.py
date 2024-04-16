# backup_script.py

import subprocess
import datetime
import os
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def main():
    try:
        backup_date = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        backup_filename = f"backup_{backup_date}.sql"

        # Backup the database
        cmd = [
            "pg_dump",
            "-h", os.environ['DATABASE_HOST'],
            "-U", os.environ['DATABASE_USER'],
            os.environ['DATABASE_NAME'],
            "-f", backup_filename
        ]
        subprocess.run(cmd, check=True)

        logger.info(f"Database backup created: {backup_filename}")

        # Transfer the backup to the remote server using SCP
        remote_path = os.environ['REMOTE_SERVER']
        subprocess.run(["scp", backup_filename, remote_path], check=True)

        logger.info(f"Backup transferred to remote server: {remote_path}")

        # Delete old backups if more than MAX_BACKUPS are present
        backups_dir = "/backups"
        all_backups = sorted(os.listdir(backups_dir))
        if len(all_backups) > int(os.environ['MAX_BACKUPS']):
            backups_to_delete = all_backups[:-int(os.environ['MAX_BACKUPS'])]
            for backup in backups_to_delete:
                os.remove(os.path.join(backups_dir, backup))
                logger.info(f"Deleted old backup: {backup}")

    except Exception as e:
        logger.exception("Error occurred during backup:", exc_info=True)

if __name__ == "__main__":
    main()
