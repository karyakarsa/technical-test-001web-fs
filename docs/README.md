# Architectural Decision Records (ADR) Guide

This guide outlines the process for creating and maintaining Architectural Decision Records (ADRs) in our project. ADRs help document important architectural decisions along with their context and consequences, ensuring a clear history of the reasoning behind them.

## Creating an ADR

1. **Copy the ADR Template**

   Copy the ADR template from `docs/adr-template.md` and create a new file in the `docs/adrs/` directory. Name the file in the format `ADR-<number>-<short-title>.md`. For example: `ADR-001-choose-database.md`.

   asdfasfd

2. **Fill Out the Template**

   Use the template to document the decision

3. **Commit Changes**
   Once the ADR document is complete, commit it to your feature branch:

   ```bash
   git add docs/adrs/ADR-<number>-<short-title>.md
   git commit -m "Add ADR <number>: <short-title>"
   git push origin <feature-branch>
   ```

## Including ADR in a GitHub Pull Request (PR)

When you are ready to submit your changes along with the ADR:

1. **Create a Pull Request**

   Navigate to the repository on GitHub and create a new pull request from your feature branch.

2. **Reference the ADR in the PR Description**

   In the pull request description, reference the ADR you have created. Include a brief summary and a link to the ADR document in the PR description. For example:

   ```bash
    ## Summary

    This PR implements the changes needed to adopt the new database solution as detailed in [ADR-001-choose-database.md](docs/adrs/ADR-001-choose-database.md).

    ## Changes

    - Implemented new database connection logic
    - Updated configuration files
    - Migrated existing data to the new database
   ```

3. **Review and Merge**
   Ensure that the ADR is reviewed along with the code changes. Once the review is complete and all checks have passed, merge the pull request.
