import re

with open('index.html', 'r') as f:
    content = f.read()

# The pattern looks for the card-btn and then captures the id from the following openPyqModal call
pattern = r'(<a href="#syllabus" onclick="switchClassView\([^)]*\);" class="card-btn">.*?</a>)(\s*<div class="card-action-grid">\s*<a href="javascript:void\(0\)" onclick="openPyqModal\(\'([^\']+)\'\);")'

def replacer(match):
    original_btn = match.group(1)
    rest = match.group(2)
    subject_id = match.group(3)
    
    new_btn = f'<a href="javascript:void(0)" onclick="openSyllabusModal(\'{subject_id}\');" class="card-btn"><i class="fa-solid fa-file-pdf"></i> Download PDF Syllabus <i class="fa-solid fa-download" style="margin-left:auto"></i></a>'
    return new_btn + rest

new_content = re.sub(pattern, replacer, content)

with open('index.html', 'w') as f:
    f.write(new_content)

print("Replacement complete.")
